import { writable } from 'svelte/store';
import { processStore } from './process.svelte';
import { load as loadStore, type Store } from '@tauri-apps/plugin-store';
import { browser } from '$app/environment';

export type ProjectTab = 'processes' | 'configuration';

export const projectState = writable<any>(undefined);
export const projectAlive = writable<boolean>(false);
export const projectTab = writable<ProjectTab>('processes');
export const projectConfiguration = writable<ProjectConfiguration | undefined>(undefined);
export const allProjectConfigurations = writable<ProjectConfiguration[]>([]);

export function resetProject() {
  projectState.set(undefined);
  projectAlive.set(false);
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
