<script lang="ts">
  import Navbar from '$lib/navbar.svelte';
  import Statusbar from '$lib/statusbar.svelte';
  import { allProjectConfigurations } from '$lib/stores/project';
  import type { PageData } from './$types';

  export let data: PageData;

  $: $allProjectConfigurations = data.projectConfigurations;
</script>

<div class="h-full flex flex-col overflow-hidden">
  <header>
    <Navbar projectConfigurations={data.projectConfigurations}></Navbar>
  </header>
  <main class="flex-auto px-4 py-2 overflow-hidden">
    <slot />
  </main>
  <footer>
    <Statusbar></Statusbar>
  </footer>
</div>
