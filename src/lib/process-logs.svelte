<script lang="ts">
  import '@xterm/xterm/css/xterm.css';
  import { getContext, onDestroy, onMount } from 'svelte';
  import { ProcessComposeService } from './process-compose.service';
  import WebSocket from '@tauri-apps/plugin-websocket';
  import '@xterm/xterm/css/xterm.css';
  import { FitAddon } from '@xterm/addon-fit';
  import { Terminal } from '@xterm/xterm';
  import { selectedProcess } from './stores/process';
  import type { Writable } from 'svelte/store';

  const processComposeService = getContext<Writable<ProcessComposeService>>('processComposeService');

  let websocket: WebSocket | undefined;

  let resizeObserver: ResizeObserver;

  const terminal = new Terminal({ disableStdin: true });
  const terminalFit = new FitAddon();
  terminal.loadAddon(terminalFit);

  $: if ($selectedProcess) {
    setupLogs($selectedProcess.name);
  }

  onMount(async () => {
    const terminalElement = document.getElementById('terminal')!;
    terminal.open(terminalElement);
    terminal.write('\x1b[?25l');
    terminalFit.fit();
    resizeObserver = new ResizeObserver(() =>
      requestAnimationFrame(() => {
        terminalFit?.fit();
      }),
    );
    resizeObserver.observe(terminalElement);
    window.addEventListener('resize', onResize);
  });

  onDestroy(async () => {
    terminal?.dispose();
    terminalFit?.dispose();
    resizeObserver?.disconnect();
    window.removeEventListener('resize', onResize);
    try {
      await websocket?.disconnect();
    } catch (e) {
      console.warn('Failed to disconnect websocket', e);
    }
  });

  async function setupLogs(processName: string): Promise<void> {
    websocket?.disconnect();
    terminal.reset();
    const processLogs = await $processComposeService.loadProcessLogs(processName);
    for (const log of processLogs) {
      terminal.writeln(log);
    }
    await streamLogs(processName);
  }

  async function streamLogs(processName: string): Promise<void> {
    const ws = await $processComposeService.createProcessLogsWebsocket(processName);
    websocket = ws;
    websocket.addListener((data) => {
      if (data.type === 'Text') {
        const payload = JSON.parse(data.data);
        terminal.writeln(payload.message);
      } else if (data.type === 'Close') {
        websocket = undefined;
      }
    });
  }

  function onResize(): void {
    terminalFit?.fit();
  }
</script>

<div id="terminal" class="h-full"></div>
