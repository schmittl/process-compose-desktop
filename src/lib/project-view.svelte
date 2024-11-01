<script lang="ts">
  import ProjectActions from './project-actions.svelte';
  import { projectConfiguration, projectStore, resetProject } from './stores/project.svelte';
  import ProcessView from './process-view.svelte';
  import ConfigurationView from './configuration-view.svelte';
  import { onMount, setContext } from 'svelte';
  import { ProcessComposeService } from './process-compose.service';
  import { writable } from 'svelte/store';
  import { onNavigate } from '$app/navigation';
  import { ProjectObserver } from './stores/project-observer.svelte';

  let projectObserver: ProjectObserver | undefined;

  const processComposeService = writable<ProcessComposeService>();
  processComposeService.set(new ProcessComposeService($projectConfiguration!));
  setContext('processComposeService', processComposeService);

  onMount(async () => {
    projectObserver = new ProjectObserver($processComposeService);
    await projectObserver.startIfAlive(); // after page reload
  });

  onNavigate(async () => {
    projectObserver?.stop();
    resetProject();
    projectConfiguration.set(undefined);
  });

  function onProjectStart(): void {
    const service = new ProcessComposeService($projectConfiguration!);
    processComposeService.set(service);
    projectObserver = new ProjectObserver(service);
    projectObserver.start();
  }

  function onProjectStop(): void {
    projectObserver?.stop();
    resetProject();
  }
</script>

<div class="flex flex-col h-full overflow-hidden">
  <ProjectActions on:start={onProjectStart} on:stop={onProjectStop}></ProjectActions>
  <div class={projectStore.projectTab === 'processes' ? 'contents' : 'hidden'}>
    <ProcessView></ProcessView>
  </div>
  <div class={projectStore.projectTab === 'configuration' ? 'contents' : 'hidden'}>
    <ConfigurationView></ConfigurationView>
  </div>
</div>
