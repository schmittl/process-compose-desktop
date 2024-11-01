import type { PageLoad, EntryGenerator } from './$types';
import { rootStore, type ProjectConfiguration } from '$lib/stores/project.svelte';

export const entries: EntryGenerator = () => {
  return [{ slug: '*' }];
};

export const load: PageLoad = async ({ params }) => {
  const projectConfiguration = await rootStore.get<ProjectConfiguration>(params.slug);
  return {
    projectConfiguration,
  };
};
