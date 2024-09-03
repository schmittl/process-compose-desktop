import type { PageLoad } from './$types';
import { rootStore, type ProjectConfiguration } from '$lib/stores/project';

export function entries() {
  return [{ slug: '*' }];
}

export const load: PageLoad = async ({ params }) => {
  const projectConfiguration = await rootStore.get<ProjectConfiguration>(params.slug);
  return {
    projectConfiguration,
  };
};
