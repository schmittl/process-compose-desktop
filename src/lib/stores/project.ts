import { writable } from 'svelte/store';
import { allProcesses, selectedProcess } from './process';
import { Store } from '@tauri-apps/plugin-store';

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

export const rootStore = new Store('store.projects');

export interface ProjectConfiguration {
  name: string;
  processComposeFilePath: string;
  port: number;
}
