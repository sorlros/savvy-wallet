import { z } from "zod";

export const CreateList = z.object({
  id: z.string(),
});
