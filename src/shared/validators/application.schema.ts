import { z } from 'zod';
import { UserSchema } from './user.schema';

export const ApplicationSchema = z.object({
  status: z.enum(['new', 'in_progress', 'done']),
  title: z.string().min(1, 'Title required'),
  description: z.string().min(1, 'Description required'),
  creator: UserSchema
})

export type Application = z.infer<typeof ApplicationSchema>