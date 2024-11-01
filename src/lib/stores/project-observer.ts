import type { ProcessComposeService } from '$lib/process-compose.service';
import { processStore } from './process.svelte';
import { projectAlive, projectState } from './project';

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
      this.throwIfAborted(() => projectAlive.set(alive));

      if (alive) {
        const state = await this.processComposeService.getProjectState(this.abortSignal);
        this.throwIfAborted(() => projectState.set(state));

        const processes = await this.processComposeService.loadProcesses(this.abortSignal);
        this.throwIfAborted(() => (processStore.allProcesses = processes));
      }
    } catch (e) {
      console.warn('Failed to update project state', e);
    }

    if (!this.abortSignal.aborted) {
      this.timeoutId = window.setTimeout(() => this.update(), 1000);
    }
  }

  private throwIfAborted(operation: Function): void {
    this.abortSignal.throwIfAborted();
    operation();
  }

  stop(): void {
    if (!this.abortSignal.aborted) {
      clearTimeout(this.timeoutId);
      this.abortController.abort();
    }
  }
}
