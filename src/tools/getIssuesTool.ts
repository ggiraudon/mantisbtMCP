import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { IssuesController } from '../controllers/IssuesController';

export const getIssuesTool: Tool<any> = {
  name: 'getIssues',
  description: 'Get a list of issues from MantisBT',
  parameters: z.object({
    page: z.number().optional().describe('Page number (default: 1)'),
    pageSize: z.number().optional().describe('Number of issues per page (default: 50)'),
  }),
  execute: async (args, context) => {
    const { page, pageSize } = args as { page?: number; pageSize?: number };
    const controller = new IssuesController();
    const issues = await controller.getIssues(page, pageSize);
    return JSON.stringify(issues);
  },
};
