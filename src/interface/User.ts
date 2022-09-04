import { z } from 'zod';

const userSchema = z.object({
  user: z.string(),
  unit: z.string(),
});

type IUser = z.infer<typeof userSchema>;

export default IUser;