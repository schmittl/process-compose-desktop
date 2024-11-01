<script lang="ts">
  import { run } from 'svelte/legacy';

  import { goto } from '$app/navigation';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();


  async function gotoNewProject(): Promise<void> {
    await goto('/new', { replaceState: true });
  }

  async function gotoProject(projectName: string): Promise<void> {
    await goto(`/projects/${projectName}`, { replaceState: true });
  }
  run(() => {
    if (data.projectConfigurations.length === 0) {
      gotoNewProject();
    } else {
      gotoProject(data.projectConfigurations[0].name);
    }
  });
</script>

<div class="h-full flex justify-center">
  <span class="loading loading-bars loading-lg"></span>
</div>
