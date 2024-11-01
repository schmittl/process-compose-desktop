import type { Process } from '$lib/process';

class ProcessStore {
  selectedProcess = $state<Process | undefined>(undefined);
  allProcesses = $state<Process[]>([]);

  reset(): void {
    this.selectedProcess = undefined;
    this.allProcesses = [];
  }
}

export const processStore = new ProcessStore();
