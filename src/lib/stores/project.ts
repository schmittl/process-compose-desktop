import { writable } from 'svelte/store';
import { allProcesses, selectedProcess } from './process';
import { createStore, Store } from '@tauri-apps/plugin-store';
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
  selectedProcess.set(undefined);
  allProcesses.set([]);
}

export let rootStore: Store;

export async function createRootStore(): Promise<Store> {
  if (browser) {
    rootStore = await createStore('store.projects');
  }
  return rootStore;
}

export interface ProjectConfiguration {
  name: string;
  processComposeFilePath: string;
  port: number;
}
