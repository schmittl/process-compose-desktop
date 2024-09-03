<script lang="ts">
  import { ProcessComposeService } from './process-compose.service';
  import { Command } from '@tauri-apps/plugin-shell';
  import { projectAlive, projectConfiguration } from './stores/project';
  import { createEventDispatcher, getContext } from 'svelte';
  import { basename } from '@tauri-apps/api/path';
  import type { Writable } from 'svelte/store';
  import ProjectTabs from './project-tabs.svelte';

  const dispatch = createEventDispatcher();
  const processComposeService = getContext<Writable<ProcessComposeService>>('processComposeService');

  async function onStartProject(): Promise<void> {
    const projectConfiguration = $projectConfiguration;

    if (!projectConfiguration) {
      return;
    }

    const port = projectConfiguration.port.toString();
    const filePath = projectConfiguration.processComposeFilePath;

    const projectFileName = await basename(filePath);
    const projectWorkingDirectory = filePath.substring(0, filePath.length - projectFileName.length - 1);

    await Command.create('spawn-process-compose', ['-t=false', '-f', projectFileName, '-p', port], {
      cwd: projectWorkingDirectory,
    }).spawn();
    dispatch('start');
  }

  async function onStopProject(): Promise<void> {
    await $processComposeService.stopProject();
    dispatch('stop');
  }
</script>

<div class="flex items-center">
  <div class="flex-1 flex justify-start">
    <h2>
      Project {$projectConfiguration?.name}
    </h2>
  </div>
  <div class="flex-1 flex justify-center"><ProjectTabs></ProjectTabs></div>
  <div class="flex-1 flex justify-end">
    {#if $projectAlive}
      <button class="btn btn-ghost btn-sm w-28" on:click={() => onStopProject()}>
        <span class="iconify mdi--stop w-6 h-6"></span>
        Stop</button
      >
    {:else}
      <button class="btn btn-ghost btn-sm w-28" on:click={() => onStartProject()}>
        <span class="iconify mdi--play w-6 h-6"></span>
        Start</button
      >
    {/if}
  </div>
</div>
