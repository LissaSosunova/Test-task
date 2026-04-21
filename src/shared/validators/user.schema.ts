// user.schema.ts
import { z } from 'zod';
import { type User } from '../interfaces/User';

export const UserSchema: z.ZodType<User> = z.object({
  id: z.string().optional(),
  role: z.enum(['user', 'manager']).optional(),
  name: z.string(),
})