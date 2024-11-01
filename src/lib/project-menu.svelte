<script lang="ts">
  import { type ProjectConfiguration } from './stores/project.svelte';
  import { page } from '$app/stores';

  interface Props {
    projectConfigurations?: ProjectConfiguration[];
  }

  let { projectConfigurations = [] }: Props = $props();
</script>

{#each projectConfigurations as project, i (project.name)}
  <li class:mt-1={i !== 0}>
    <a href="/projects/{project.name}" class:bg-primary={$page.url.pathname === `/projects/${project.name}`}>
      {project.name}
    </a>
  </li>
{/each}

<li>
  <a href="/new" class="btn btn-ghost btn-sm mt-1" class:bg-primary={$page.url.pathname === `/new`}>
    <span class="iconify mdi--plus-box w-6 h-6"></span>New Project
  </a>
</li>
