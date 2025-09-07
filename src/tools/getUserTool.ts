import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { UsersController } from '../controllers/UsersController';

export const getUserTool: Tool<any> = {
  name: 'getUser',
  description: 'Get a user by ID from MantisBT',
  parameters: z.object({
    userId: z.number().describe('The ID of the user to retrieve'),
  }),
  execute: async (args, context) => {
    const { userId } = args as { userId: number };
    const controller = new UsersController();
    const user = await controller.getUser(userId);
    return JSON.stringify(user, null, 2);
  },
};
