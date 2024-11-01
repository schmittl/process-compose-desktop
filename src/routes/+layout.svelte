<script lang="ts">
  import { run } from 'svelte/legacy';

  import Navbar from '$lib/navbar.svelte';
  import Statusbar from '$lib/statusbar.svelte';
  import { allProjectConfigurations } from '$lib/stores/project';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
    children?: import('svelte').Snippet;
  }

  let { data, children }: Props = $props();

  run(() => {
    $allProjectConfigurations = data.projectConfigurations;
  });
</script>

<div class="h-full flex flex-col overflow-hidden">
  <header>
    <Navbar projectConfigurations={data.projectConfigurations}></Navbar>
  </header>
  <main class="flex-auto px-4 py-2 overflow-hidden">
    {@render children?.()}
  </main>
  <footer>
    <Statusbar></Statusbar>
  </footer>
</div>
