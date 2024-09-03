<script lang="ts">
  import { getContext } from 'svelte';
  import { ProcessComposeService } from './process-compose.service';
  import { allProcesses, selectedProcess } from './stores/process';
  import { formatBytes } from './utils/format';
  import type { Writable } from 'svelte/store';

  const processComposeService = getContext<Writable<ProcessComposeService>>('processComposeService');

  $: if ($allProcesses.length > 0 && $selectedProcess == null) {
    $selectedProcess = $allProcesses[0];
  }

  async function onRestartProcess(processName: string): Promise<void> {
    await $processComposeService.restartProcess(processName);
  }

  async function onStopProcess(processName: string): Promise<void> {
    await $processComposeService.stopProcess(processName);
  }
</script>

<table class="table table-xs">
  <thead>
    <tr>
      <th scope="col">PID</th>
      <th scope="col">Name</th>
      <th scope="col">Status</th>
      <th scope="col">Age</th>
      <th scope="col">Namespace</th>
      <th scope="col">Restarts</th>
      <th scope="col">Memory</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {#each $allProcesses as process (process.name)}
      <tr
        on:click={() => selectedProcess.set(process)}
        class="hover"
        class:bg-base-300={process.name === $selectedProcess?.name}
      >
        <td>{process.pid}</td>
        <td>{process.name}</td>
        <td>{process.status}</td>
        <td>{process.system_time}</td>
        <td>{process.namespace}</td>
        <td>{process.restarts}</td>
        <td>{formatBytes(process.mem)}</td>
        <td>
          <button
            class="btn btn-ghost btn-sm btn-square"
            on:click|stopPropagation={() => onRestartProcess(process.name)}
          >
            <span class="iconify mdi--refresh w-6 h-6"></span>
          </button>
          <button
            class:invisible={process.status !== 'Running' && process.status !== 'Launching'}
            class="btn btn-ghost btn-sm btn-square ml-2"
            on:click|stopPropagation={() => onStopProcess(process.name)}
          >
            <span class="iconify mdi--stop w-6 h-6"></span>
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
