import { z } from 'zod';
import type { paths } from './api';

// Extract types from the generated API types
export type ProjectResponse = paths['/api/rest/projects/{project_id}']['get']['responses']['200']['content']['application/json'];
export type ProjectsListResponse = paths['/api/rest/projects/']['get']['responses']['200']['content']['application/json'];

// Zod schemas for validation
export const ProjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  status: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
  }).optional(),
  enabled: z.boolean().optional(),
  view_state: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
  }).optional(),
  access_min: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
  }).optional(),
  categories: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })).optional(),
});

export const ProjectsListSchema = z.object({
  projects: z.array(ProjectSchema),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectsList = z.infer<typeof ProjectsListSchema>;
