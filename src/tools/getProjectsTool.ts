import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { ProjectsController } from '../controllers/ProjectsController';

export const getProjectsTool: Tool<any> = {
  name: 'getProjects',
  description: 'Get all projects from MantisBT',
  parameters: z.object({}),
  execute: async (args, context) => {
    const controller = new ProjectsController();
    const projects = await controller.getProjects();
    return JSON.stringify(projects, null, 2);
  },
};
