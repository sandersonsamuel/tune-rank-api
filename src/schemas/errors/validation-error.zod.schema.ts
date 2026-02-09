import { z } from "zod";

export const validationErrorSchema = z.object({
    expected: z.string(),
    code: z.string(),
    path: z.array(z.string()),
    message: z.string()
})