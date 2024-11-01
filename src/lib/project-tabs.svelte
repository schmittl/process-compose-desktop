<script lang="ts">
  import { projectStore } from './stores/project.svelte';
</script>

<div role="tablist" class="tabs tabs-boxed tabs-sm">
  <a
    href={'#'}
    role="tab"
    class="tab w-32"
    class:tab-active={projectStore.projectTab === 'processes'}
    onclick={() => (projectStore.projectTab = 'processes')}>Processes</a
  >
  <a
    href={'#'}
    role="tab"
    class="tab w-32"
    class:tab-active={projectStore.projectTab === 'configuration'}
    onclick={() => (projectStore.projectTab = 'configuration')}>Configuration</a
  >
</div>
