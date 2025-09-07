import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { IssuesController } from '../controllers/IssuesController';

export const createIssueTool: Tool<any> = {
  name: 'createIssue',
  description: 'Create a new issue in MantisBT',
  parameters: z.object({
    summary: z.string().describe('Issue summary'),
    description: z.string().optional().describe('Issue description'),
    projectId: z.number().describe('Project ID'),
    categoryId: z.number().optional().describe('Category ID'),
    priorityId: z.number().optional().describe('Priority ID'),
    severityId: z.number().optional().describe('Severity ID'),
  }),
  execute: async (args, context) => {
    const { summary, description, projectId, categoryId, priorityId, severityId } = args as {
      summary: string;
      description?: string;
      projectId: number;
      categoryId?: number;
      priorityId?: number;
      severityId?: number;
    };
    
    const controller = new IssuesController();
    const issueData = {
      summary,
      description,
      project: { id: projectId },
      ...(categoryId && { category: { id: categoryId } }),
      ...(priorityId && { priority: { id: priorityId } }),
      ...(severityId && { severity: { id: severityId } }),
    };
    
    const newIssue = await controller.createIssue(issueData);
    return JSON.stringify(newIssue, null, 2);
  },
};
