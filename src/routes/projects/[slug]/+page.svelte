<script lang="ts">
  import ProjectView from '$lib/project-view.svelte';
  import { projectStore } from '$lib/stores/project.svelte';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  $effect(() => {
    if (data.projectConfiguration) {
      projectStore.projectConfiguration = data.projectConfiguration;
    }
  });
</script>

{#if projectStore.projectConfiguration}
  {#key projectStore.projectConfiguration.name}
    <ProjectView></ProjectView>
  {/key}
{/if}
