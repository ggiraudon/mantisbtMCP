import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { IssuesController } from '../controllers/IssuesController';

export const getIssueTool: Tool<any> = {
  name: 'getIssue',
  description: 'Get an issue by ID from MantisBT',
  parameters: z.object({
    issueId: z.number().describe('The ID of the issue to retrieve'),
  }),
  execute: async (args, context) => {
    const { issueId } = args as { issueId: number };
    const controller = new IssuesController();
    const issue = await controller.getIssue(issueId);
    return JSON.stringify(issue, null, 2);
  },
};
