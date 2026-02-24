import { z } from "zod";

export const ImageSchema = z.object({
    url: z.string(),
    height: z.number(),
    width: z.number(),
});

export const ArtistSummarySchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
});
