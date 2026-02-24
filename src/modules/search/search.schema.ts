import { z } from "zod";
import { AlbumSchema } from "../album/album.schema";
import { ArtistSchema } from "../artist/artist.schema";
import { TrackSchema } from "../track/track.schema";

export const SearchSchema = z.object({
    q: z.string(),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;

export const SearchResponseSchema = z.object({
    albums: z.array(AlbumSchema).optional(),
    tracks: z.array(TrackSchema).optional(),
    artists: z.array(ArtistSchema).optional(),
});