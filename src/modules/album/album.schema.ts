import { z } from "zod";

export const SpotifyExternalUrlsSchema = z.object({
    spotify: z.string()
});

export const SpotifyImageSchema = z.object({
    height: z.number(),
    url: z.string(),
    width: z.number()
});

export const SpotifyArtistInAlbumSchema = z.object({
    external_urls: SpotifyExternalUrlsSchema,
    href: z.string(),
    id: z.string(),
    name: z.string(),
    type: z.string(),
    uri: z.string()
});

export const SpotifyTrackItemInAlbumSchema = z.object({
    artists: z.array(SpotifyArtistInAlbumSchema),
    duration_ms: z.number(),
    id: z.string(),
    name: z.string(),
    uri: z.string()
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
    artists: z.array(SpotifyArtistInAlbumSchema)
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
