<script lang="ts">
  import { run } from 'svelte/legacy';

  import ProjectView from '$lib/project-view.svelte';
  import { projectConfiguration } from '$lib/stores/project';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  run(() => {
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
