import type { LoadProcessResponse, Process } from './process';
import { fetch } from '@tauri-apps/plugin-http';
import WebSocket from '@tauri-apps/plugin-websocket';
import type { ProjectConfiguration } from './stores/project.svelte';

export class ProcessComposeService {
  private readonly baseUrl: string;
  private readonly websocketBaseUrl: string;

  constructor(private readonly projectConfiguration: ProjectConfiguration) {
    this.baseUrl = 'http://localhost:' + this.projectConfiguration.port;
    this.websocketBaseUrl = 'ws://localhost:' + this.projectConfiguration.port;
  }

  async loadProcesses(signal?: AbortSignal): Promise<Process[]> {
    const response = await fetch(`${this.baseUrl}/processes`, { signal });
    const json: LoadProcessResponse = await response.json();
    const processes = json.data;
    return processes.sort((a, b) => a.name.localeCompare(b.name));
  }

  async loadProcessLogs(processName: string): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/process/logs/${processName}/1000/0`);
    const json = (await response.json()) as any;
    return json.logs;
  }

  async restartProcess(processName: string): Promise<void> {
    await fetch(`${this.baseUrl}/process/restart/${processName}`, {
      method: 'POST',
    });
  }

  async stopProcess(processName: string): Promise<void> {
    await fetch(`${this.baseUrl}/process/stop/${processName}`, {
      method: 'PATCH',
    });
  }

  async createProcessLogsWebsocket(processName: string): Promise<WebSocket> {
    return await WebSocket.connect(`${this.websocketBaseUrl}/process/logs/ws?name=${processName}&offset=0&follow=true`);
  }

  async isProjectAlive(signal?: AbortSignal): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/live`, { signal });
      const data = await response.json();
      return data.status === 'alive';
    } catch (error) {
      return false;
    }
  }

  async getProjectState(signal?: AbortSignal): Promise<any> {
    const response = await fetch(`${this.baseUrl}/project/state`, { signal });
    return response.json();
  }

  async stopProject(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/project/stop`, { method: 'POST' });
    return response.json();
  }
}
