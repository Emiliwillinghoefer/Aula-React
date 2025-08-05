import { z } from "zod";

export const todoSchema = z.strictObject({
  checked: z.boolean(),
  text: z.string().min(8),
});

export const partialTodoSchema = todoSchema.partial();
