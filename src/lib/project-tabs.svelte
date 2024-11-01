<script lang="ts">
  import { projectTab } from './stores/project';
</script>

<div role="tablist" class="tabs tabs-boxed tabs-sm">
  <a
    href={'#'}
    role="tab"
    class="tab w-32"
    class:tab-active={$projectTab === 'processes'}
    onclick={() => ($projectTab = 'processes')}>Processes</a
  >
  <a
    href={'#'}
    role="tab"
    class="tab w-32"
    class:tab-active={$projectTab === 'configuration'}
    onclick={() => ($projectTab = 'configuration')}>Configuration</a
  >
</div>
