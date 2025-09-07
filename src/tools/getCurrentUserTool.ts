import type { Tool } from 'fastmcp';
import { z } from 'zod';
import { UsersController } from '../controllers/UsersController';

export const getCurrentUserTool: Tool<any> = {
  name: 'getCurrentUser',
  description: 'Get the current authenticated user from MantisBT',
  parameters: z.object({}),
  execute: async (args, context) => {
    const controller = new UsersController();
    const user = await controller.getCurrentUser();
    return JSON.stringify(user, null, 2);
  },
};
