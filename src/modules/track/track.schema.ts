import { z } from "zod";
import { SpotifyAlbumSchema } from "@/modules/album/album.schema";

export const SpotifyExternalUrlsSchema = z.object({
    spotify: z.string()
});

export const SpotifyExternalIdsSchema = z.object({
    isrc: z.string().optional(),
    ean: z.string().optional(),
    upc: z.string().optional(),
});

export const SpotifyArtistSummarySchema = z.object({
    external_urls: SpotifyExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    name: z.string(),
    type: z.string(),
    uri: z.string()
});

export const SpotifyTrackSchema = z.object({
    album: SpotifyAlbumSchema,
    artists: z.array(SpotifyArtistSummarySchema),
    available_markets: z.array(z.string()),
    disc_number: z.number(),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_ids: SpotifyExternalIdsSchema,
    external_urls: SpotifyExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    is_local: z.boolean(),
    is_playable: z.boolean(),
    name: z.string(),
    popularity: z.number(),
    preview_url: z.string().nullable(),
    track_number: z.number(),
    type: z.literal("track"),
    uri: z.string()
});

export const SpotifyTrackSearchResponseSchema = z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    offset: z.number(),
    previous: z.string().nullable(),
    total: z.number(),
    items: z.array(SpotifyTrackSchema)
});
