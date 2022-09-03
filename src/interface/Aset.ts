import { z } from 'zod';

const asetSchema = z.object({
  name: z.string(),
  model: z.string(),
  owner: z.string(),
  status: z.string(),
  helthLevel: z.string(),
  image: z.string(),
  energy: z.number().array(),
  temp: z.number().array(),
  vibration: z.number().array(),
  createdAt: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  updatedAt: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
});

type IAset = z.infer<typeof asetSchema>;

export default IAset;
export { asetSchema };