import type { ProcessComposeService } from '$lib/process-compose.service';
import { processStore } from './process.svelte';
import { projectStore } from './project.svelte';

export class ProjectObserver {
  private timeoutId?: number;
  private readonly abortController = new AbortController();
  private readonly abortSignal = this.abortController.signal;

  constructor(private readonly processComposeService: ProcessComposeService) {}

  start(): void {
    this.startUpdate();
  }

  async startIfAlive(): Promise<void> {
    const alive = await this.processComposeService.isProjectAlive(this.abortSignal);
    if (alive) {
      this.startUpdate();
    }
  }

  private startUpdate() {
    this.timeoutId = window.setTimeout(() => this.update(), 500);
  }

  async update(): Promise<void> {
    if (this.abortSignal.aborted) {
      return;
    }

    try {
      const alive = await this.processComposeService.isProjectAlive(this.abortSignal);
      this.abortSignal.throwIfAborted();
      projectStore.projectAlive = alive;

      if (alive) {
        const state = await this.processComposeService.getProjectState(this.abortSignal);
        const processes = await this.processComposeService.loadProcesses(this.abortSignal);
        this.abortSignal.throwIfAborted();
        projectStore.projectState = state;
        processStore.allProcesses = processes;
      }
    } catch (e) {
      console.warn('Failed to update project state', e);
    }

    if (!this.abortSignal.aborted) {
      this.timeoutId = window.setTimeout(() => this.update(), 1000);
    }
  }

  stop(): void {
    if (!this.abortSignal.aborted) {
      clearTimeout(this.timeoutId);
      this.abortController.abort();
    }
  }
}
