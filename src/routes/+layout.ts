import '../app.css';
import type { PageLoad } from './$types';
import { createRootStore, type ProjectConfiguration } from '$lib/stores/project';

export const prerender = true;
export const ssr = false;

export const load: PageLoad = async () => {
  const rootStore = await createRootStore();
  if (!rootStore) {
    return { projectConfigurations: [] };
  }
  const projectConfigurations = await rootStore.values<ProjectConfiguration>();
  projectConfigurations.sort((a, b) => a.name.localeCompare(b.name));
  return {
    projectConfigurations,
  };
};
