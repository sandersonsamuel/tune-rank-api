import { z } from "zod";

export const SearchSchema = z.object({
    q: z.string().min(1).max(100),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;