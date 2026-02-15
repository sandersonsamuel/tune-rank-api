import { z } from "zod";

export const SearchSchema = z.object({
    q: z.string(),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;