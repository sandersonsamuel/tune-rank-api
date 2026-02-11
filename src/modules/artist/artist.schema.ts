import { z } from "zod";

export const SpotifyExternalUrlsSchema = z.object({
    spotify: z.string()
});

export const SpotifyImageSchema = z.object({
    url: z.string(),
    height: z.number(),
    width: z.number()
});

export const SpotifyFollowersSchema = z.object({
    href: z.string().nullable(),
    total: z.number()
});

export const SpotifyArtistSchema = z.object({
    external_urls: SpotifyExternalUrlsSchema,
    followers: SpotifyFollowersSchema,
    genres: z.array(z.string()),
    href: z.string(),
    id: z.string(),
    images: z.array(SpotifyImageSchema),
    name: z.string(),
    popularity: z.number(),
    type: z.string(),
    uri: z.string()
});

export const SpotifyArtistSearchResponseSchema = z.object({
    href: z.string(),
    limit: z.number(),
    next: z.string().nullable(),
    offset: z.number(),
    previous: z.string().nullable(),
    total: z.number(),
    items: z.array(SpotifyArtistSchema)
});
