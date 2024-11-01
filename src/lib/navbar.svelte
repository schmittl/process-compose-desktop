<script lang="ts">
  import ProjectMenu from './project-menu.svelte';
  import { type ProjectConfiguration } from './stores/project';

  interface Props {
    projectConfigurations?: ProjectConfiguration[];
  }

  let { projectConfigurations = [] }: Props = $props();
</script>

<div class="navbar bg-base-300 p-0 w-full min-h-12 h-12">
  <div class="navbar-start">
    <div class="dropdown dropdown-start">
      <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
        <span class="iconify mdi--menu w-6 h-6"></span>
      </div>
      <ul
        class="menu dropdown-content bg-base-300 rounded-box z-[1] w-64 mt-2 ml-2 shadow p-2 outline outline-neutral-600"
      >
        <ProjectMenu {projectConfigurations}></ProjectMenu>
      </ul>
    </div>
  </div>
</div>
