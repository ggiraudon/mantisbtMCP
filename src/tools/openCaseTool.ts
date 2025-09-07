import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { IssuesController } from '../controllers/IssuesController';
const project_id: number = 1; // BRAXIOM
const categories: Map<string, number> = new Map<string, number>([
            ['Sales', 4],
            ['Support', 5],
            ['Orders', 13]
        ]);


export const openCaseTool: Tool<any> = {
  name: 'openCase',
  description: 'Open a new case in MantisBT',
  parameters: z.object({
    title: z.string().describe('Case title'),
    content: z.string().describe('Case content'),
    caseType: z.enum(['Sales', 'Support', 'Orders']).describe('Type of case'),
    customer_email: z.string().describe('Email of the customer'),
    customer_name: z.string().optional().describe('Name of the customer'),
  }),
  execute: async (args, context) => {
    const { title, content, caseType, customer_email, customer_name } = args as {
      title: string;
      content: string;
      caseType: 'Sales' | 'Support' | 'Orders';
      customer_email: string;
      customer_name?: string;
    };
    const summary = title;
    const description = content;
    const projectId = project_id; // Use the predefined project ID
    const categoryId = categories.get(caseType);
    const priorityId = 1; // Default priority
    const severityId = 1; // Default severity
    const customFields = [
      {
        field: { id: 2 }, // Example custom field ID for "Customer Name"
        value: customer_name,
      },
      {
        field: { id: 3 }, // Example custom field ID for "Customer Email"
        value: customer_email,
      },
    ];

    const controller = new IssuesController();
    const issueData = {
      summary,
      description,
      project: { id: projectId },
      ...(categoryId && { category: { id: categoryId } }),
      ...(customFields && { custom_fields: customFields }),
    };
    
    const newIssue = await controller.createIssue(issueData);
    return JSON.stringify(newIssue, null, 2);
  },
};
