<script lang="ts">
  import { run } from 'svelte/legacy';

  import { open } from '@tauri-apps/plugin-dialog';
  import { rootStore, type ProjectConfiguration } from './stores/project';
  import { goto } from '$app/navigation';

  let selectedFilePath: string | undefined = $state();
  let selectedProjectName: string | undefined = $state();
  let invalidProjectName = $state(false);
  let invalidFilePath = $state(false);

  run(() => {
    if (selectedProjectName) {
      invalidProjectName = false;
    }
  });

  run(() => {
    if (selectedFilePath) {
      invalidFilePath = false;
    }
  });

  async function onOpenProject(): Promise<void> {
    selectedFilePath =
      (await open({
        multiple: false,
        directory: false,
      })) ?? undefined;
  }

  async function onCreateProject(): Promise<void> {
    if (!selectedProjectName) {
      invalidProjectName = true;
      return;
    }
    if (!selectedFilePath) {
      invalidFilePath = true;
      return;
    }

    const projectName = selectedProjectName.trim();
    const projectConfiguration: ProjectConfiguration = {
      name: projectName,
      processComposeFilePath: selectedFilePath,
      port: 8080,
    };

    await rootStore.set(projectName, projectConfiguration);
    await rootStore.save();

    await goto(`/projects/${projectName}`, { replaceState: true, invalidateAll: true });
  }
</script>

<div class="hero min-h-full">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1>New Project</h1>
      <div class="p-4 flex flex-col items-start gap-4">
        <div class="w-full">
          <input
            type="text"
            placeholder="Project name"
            class="input input-bordered w-full"
            class:input-error={invalidProjectName}
            required
            bind:value={selectedProjectName}
            minlength="2"
            maxlength="32"
            autocomplete="off"
          />
        </div>
        <div class="flex items-center justify-between w-full">
          <span>Process Compose File</span>
          <div>
            <button
              class="btn btn-ghost btn-outline btn-sm ml-4"
              class:btn-error={invalidFilePath}
              onclick={() => onOpenProject()}>Select</button
            >
          </div>
        </div>
        {#if selectedFilePath}
          <div class="font-mono text-sm break-words w-full">
            {selectedFilePath}
          </div>
        {/if}
        <button class="btn btn-primary w-full" onclick={() => onCreateProject()}>Create</button>
      </div>
    </div>
  </div>
</div>
