import type { Process } from '$lib/process';
import { writable } from 'svelte/store';

export const selectedProcess = writable<Process | undefined>(undefined);
export const allProcesses = writable<Process[]>([]);
