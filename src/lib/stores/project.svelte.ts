import { processStore } from './process.svelte';
import { load as loadStore, type Store } from '@tauri-apps/plugin-store';
import { browser } from '$app/environment';

export type ProjectTab = 'processes' | 'configuration';

export class ProjectStore {
  projectState = $state<any>();
  projectAlive = $state<boolean>(false);
  projectTab = $state<ProjectTab>('processes');
  projectConfiguration = $state<ProjectConfiguration>();
  allProjectConfigurations = $state<ProjectConfiguration[]>([]);

  reset(): void {
    this.stop();
    this.projectConfiguration = undefined;
  }

  stop(): void {
    this.projectState = undefined;
    this.projectAlive = false;
    processStore.reset();
  }
}

export const projectStore = new ProjectStore();

export let rootStore: Store;

export async function createRootStore(): Promise<Store> {
  if (browser && rootStore == null) {
    rootStore = await loadStore('store.projects');
  }
  return rootStore;
}

export interface ProjectConfiguration {
  name: string;
  processComposeFilePath: string;
  port: number;
}
