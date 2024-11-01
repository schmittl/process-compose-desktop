<script lang="ts">
  import ProcessTable from './process-table.svelte';
  import { processStore } from './stores/process.svelte';
  import ProcessLogs from './process-logs.svelte';
  import { projectStore } from './stores/project.svelte';
</script>

{#if projectStore.projectAlive}
  <div class="max-h-60 mt-4 overflow-auto">
    <ProcessTable></ProcessTable>
  </div>
  <div class="divider">{processStore.selectedProcess?.name ?? 'Logs'}</div>
  <div class="flex-auto overflow-auto">
    <ProcessLogs></ProcessLogs>
  </div>
{:else}
  <div class="flex flex-col justify-center items-center h-full text-lg">Start project to view processes</div>
{/if}
