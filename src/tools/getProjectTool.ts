import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { ProjectsController } from '../controllers/ProjectsController';

export const getProjectTool: Tool<any> = {
  name: 'getProject',
  description: 'Get a project by ID from MantisBT',
  parameters: z.object({
    projectId: z.number().describe('The ID of the project to retrieve'),
  }),
  execute: async (args, context) => {
    const { projectId } = args as { projectId: number };
    const controller = new ProjectsController();
    const project = await controller.getProject(projectId);
    return JSON.stringify(project, null, 2);
  },
};
