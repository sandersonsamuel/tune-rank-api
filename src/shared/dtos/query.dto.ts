import { z } from "zod";

export const queryIdsDto = z.object({
    query: z.object({
        ids: z.string().includes(",").min(1).max(100)
    })
});

export type QueryDto = z.infer<typeof queryIdsDto>;
