<script lang="ts">
  import { goto } from '$app/navigation';
  import { projectStore, rootStore } from './stores/project.svelte';

  let selectedPort: string | undefined = $state();
  let invalidPort = $state(false);

  $effect(() => {
    if (selectedPort == null && projectStore.projectConfiguration) {
      selectedPort = projectStore.projectConfiguration.port.toString();
    }
  });

  async function onSelectedPort(): Promise<void> {
    if (!isPortValid(selectedPort)) {
      invalidPort = true;
      return;
    }

    invalidPort = false;

    const configuration = projectStore.projectConfiguration;

    if (!configuration) {
      return;
    }

    configuration.port = +selectedPort;

    await rootStore.set(configuration.name, configuration);
    await rootStore.save();

    projectStore.projectConfiguration = configuration;
  }

  function isPortValid(value: string | undefined): value is string {
    const port = value ? +value : undefined;
    return port != null && Number.isInteger(port) && port > 0 && port <= 65535;
  }

  async function deleteProject(): Promise<void> {
    const configuration = projectStore.projectConfiguration;

    if (!configuration) {
      return;
    }

    await rootStore.delete(configuration.name);
    await rootStore.save();

    goto('/', { replaceState: true, invalidateAll: true });
  }
</script>

<div class="grid grid-cols-[1fr_2fr] gap-4 m-8 p-4 self-center">
  <div class="divider col-span-2">Project configuration</div>
  {#if projectStore.projectConfiguration}
    <span class="font-semibold">Project name</span>
    <span>{projectStore.projectConfiguration.name}</span>
    <span class="font-semibold">Process Compose File</span>
    <span>{projectStore.projectConfiguration.processComposeFilePath}</span>
  {/if}
  <label class="font-semibold" for="port">Process Compose Port</label>
  <input
    id="port"
    type="text"
    placeholder="Port number"
    class="input input-sm input-bordered"
    class:input-error={invalidPort}
    disabled={projectStore.projectAlive}
    bind:value={selectedPort}
    onblur={onSelectedPort}
  />
  <div class="divider col-span-2">Danger zone</div>
  <button class="font-semibold btn btn-sm btn-outline col-span-2" onclick={deleteProject}>Delete Project</button>
</div>
