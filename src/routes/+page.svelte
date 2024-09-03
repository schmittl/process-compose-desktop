<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  export let data: PageData;

  $: if (data.projectConfigurations.length === 0) {
    gotoNewProject();
  } else {
    gotoProject(data.projectConfigurations[0].name);
  }

  async function gotoNewProject(): Promise<void> {
    await goto('/new', { replaceState: true });
  }

  async function gotoProject(projectName: string): Promise<void> {
    await goto(`/projects/${projectName}`, { replaceState: true });
  }
</script>

<div class="h-full flex justify-center">
  <span class="loading loading-bars loading-lg"></span>
</div>
