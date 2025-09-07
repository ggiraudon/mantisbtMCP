import { z } from 'zod';

// Zod schemas for validation
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string().optional(),
  email: z.string().optional(),
  real_name: z.string().optional(),
  enabled: z.boolean().optional(),
  protected: z.boolean().optional(),
  access_level: z.object({
    id: z.number(),
    name: z.string(),
    label: z.string(),
  }).optional(),
  created_at: z.string().optional(),
  last_visit: z.string().optional(),
});

export const UsersListSchema = z.object({
  users: z.array(UserSchema),
});

export type User = z.infer<typeof UserSchema>;
export type UsersList = z.infer<typeof UsersListSchema>;
