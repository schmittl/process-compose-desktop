<script lang="ts">
  import ProjectMenu from './project-menu.svelte';
  import { type ProjectConfiguration } from './stores/project';

  export let projectConfigurations: ProjectConfiguration[] = [];
</script>

<div class="navbar bg-base-300 p-0 w-full min-h-12 h-12">
  <div class="navbar-start">
    <div class="dropdown dropdown-start">
      <div tabindex="0" role="button" class="btn btn-ghost rounded-btn">
        <span class="iconify mdi--menu w-6 h-6"></span>
      </div>
      <ul class="menu dropdown-content bg-base-300 rounded-box z-[1] w-64 mt-2 p-2 shadow">
        <ProjectMenu {projectConfigurations}></ProjectMenu>
      </ul>
    </div>
  </div>
</div>
