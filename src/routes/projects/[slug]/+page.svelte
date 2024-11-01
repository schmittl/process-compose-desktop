<script lang="ts">
  import ProjectView from '$lib/project-view.svelte';
  import { projectConfiguration } from '$lib/stores/project.svelte';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  $effect(() => {
    if (data.projectConfiguration) {
      $projectConfiguration = data.projectConfiguration;
    }
  });
</script>

{#if $projectConfiguration}
  {#key $projectConfiguration.name}
    <ProjectView></ProjectView>
  {/key}
{/if}
