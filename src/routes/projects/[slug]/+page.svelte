<script lang="ts">
  import ProjectView from '$lib/project-view.svelte';
  import { projectConfiguration } from '$lib/stores/project';
  import type { PageData } from './$types';

  export let data: PageData;

  $: if (data.projectConfiguration) {
    $projectConfiguration = data.projectConfiguration;
  }
</script>

{#if $projectConfiguration}
  {#key $projectConfiguration.name}
    <ProjectView></ProjectView>
  {/key}
{/if}
