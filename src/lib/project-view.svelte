<script lang="ts">
  import ProjectActions from './project-actions.svelte';
  import { projectStore } from './stores/project.svelte';
  import ProcessView from './process-view.svelte';
  import ConfigurationView from './configuration-view.svelte';
  import { onMount, setContext } from 'svelte';
  import { ProcessComposeService } from './process-compose.service';
  import { onNavigate } from '$app/navigation';
  import { ProjectObserver } from './stores/project-observer.svelte';

  let projectObserver: ProjectObserver | undefined;

  let processComposeService = $state<ProcessComposeService>(
    new ProcessComposeService(projectStore.projectConfiguration!),
  );

  // initialize in new scope as workaround for warning:
  // 'State referenced in its own scope will never update. Did you mean to reference it inside a closure?'
  function initContext() {
    setContext('processComposeService', processComposeService);
  }
  initContext();

  onMount(async () => {
    projectObserver = new ProjectObserver(processComposeService);
    await projectObserver.startIfAlive(); // after page reload
  });

  onNavigate(async () => {
    projectObserver?.stop();
    projectStore.reset();
  });

  function onProjectStart(): void {
    const service = new ProcessComposeService(projectStore.projectConfiguration!);
    processComposeService = service;
    projectObserver = new ProjectObserver(service);
    projectObserver.start();
  }

  function onProjectStop(): void {
    projectObserver?.stop();
    projectStore.stop();
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
