import { z } from "zod";
import { SpotifyAlbumSchema } from "../album/album.schema";
import { SpotifyArtistSchema } from "../artist/artist.schema";
import { SpotifyTrackSchema } from "../track/track.schema";

export const SearchSchema = z.object({
    q: z.string(),
});

export type SearchSchemaType = z.infer<typeof SearchSchema>;

export const SearchResponseSchema = z.object({
    albums: SpotifyAlbumSchema,
    artists: SpotifyArtistSchema,
    tracks: SpotifyTrackSchema,
});