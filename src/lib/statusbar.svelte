<script lang="ts">
  import { projectAlive, projectConfiguration, projectState } from './stores/project';
</script>

{#if $projectConfiguration}
  <div class="flex justify-between px-1 bg-info text-info-content text-sm space-x-2 z-40">
    <div class="flex flex-wrap gap-x-5 h-full">
      <span>
        Status:
        {#if $projectAlive}
          Connected
        {:else}
          Not connected
        {/if}</span
      >
      {#if $projectState}
        {@const state = $projectState}
        <span>Hostname: {state.hostName}</span>
        <span>Processes: {state.runningProcessNum}/{state.processNum}</span>
      {/if}
    </div>
    <div>
      {#if $projectState}
        {@const state = $projectState}
        Version: {state.version === 'undefined' ? 'dev' : state.version}
      {/if}
    </div>
  </div>
{/if}
