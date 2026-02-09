import { z } from "zod";

export const SpotifyExternalUrlsSchema = z.object({
    spotify: z.string()
});

export const SpotifyImageSchema = z.object({
    height: z.number(),
    url: z.string(),
    width: z.number()
});

export const SpotifyArtistSchema = z.object({
    external_urls: SpotifyExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    name: z.string(),
    type: z.string(),
    uri: z.string()
});

export const SpotifyTrackItemInAlbumSchema = z.object({
    artists: z.array(SpotifyArtistSchema),
    available_markets: z.array(z.string()),
    disc_number: z.number(),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_urls: SpotifyExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    name: z.string(),
    preview_url: z.any(),
    track_number: z.number(),
    type: z.string(),
    uri: z.string(),
    is_local: z.boolean()
});

export const AlbumTracksSchema = z.object({
    href: z.string(),
    limit: z.number(),
    next: z.any(),
    offset: z.number(),
    previous: z.any(),
    total: z.number(),
    items: z.array(SpotifyTrackItemInAlbumSchema)
});

export const SpotifyAlbumSchema = z.object({
    album_type: z.string(),
    total_tracks: z.number(),
    available_markets: z.array(z.string()),
    external_urls: SpotifyExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    images: z.array(SpotifyImageSchema),
    name: z.string(),
    release_date: z.string(),
    release_date_precision: z.string(),
    type: z.string(),
    uri: z.string(),
    tracks: AlbumTracksSchema,
    artists: z.array(SpotifyArtistSchema)
});

export const SpotifyAlbumSearchResponseSchema = z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    offset: z.number(),
    previous: z.string().nullable(),
    total: z.number(),
    items: z.array(SpotifyAlbumSchema)
});
