import { writable } from 'svelte/store';
import { processStore } from './process.svelte';
import { load as loadStore, type Store } from '@tauri-apps/plugin-store';
import { browser } from '$app/environment';

export type ProjectTab = 'processes' | 'configuration';

export const projectConfiguration = writable<ProjectConfiguration | undefined>(undefined);

export class ProjectStore {
  projectState = $state<any>(undefined);
  projectAlive = $state<boolean>(false);
  projectTab = $state<ProjectTab>('processes');
  projectConfiguration = $state<ProjectConfiguration | undefined>(undefined);
  allProjectConfigurations = $state<ProjectConfiguration[]>([]);

  reset(): void {
    this.projectState = undefined;
    this.projectAlive = false;
  }
}

export const projectStore = new ProjectStore();

export function resetProject(): void {
  projectStore.reset();
  processStore.reset();
}

export let rootStore: Store;

export async function createRootStore(): Promise<Store> {
  if (browser) {
    rootStore = await loadStore('store.projects');
  }
  return rootStore;
}

export interface ProjectConfiguration {
  name: string;
  processComposeFilePath: string;
  port: number;
}
