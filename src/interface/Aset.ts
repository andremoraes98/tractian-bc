import { z } from 'zod';

const asetSchema = z.object({
  _id: z.string(),
  name: z.string(),
  model: z.string(),
  owner: z.string(),
  status: z.string(),
  helthLevel: z.string(),
  image: z.string(),
  energy: z.number().array(),
  temp: z.number().array(),
  vibration: z.number().array(),
});

type IAset = z.infer<typeof asetSchema>;

export default IAset;
export { asetSchema };