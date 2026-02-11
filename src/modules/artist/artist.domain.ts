import z from "zod";
import { SpotifyArtistSchema, SpotifyArtistSearchResponseSchema, SpotifyExternalUrlsSchema, SpotifyFollowersSchema, SpotifyImageSchema } from "./artist.schema";

export type SpotifyArtistSearchResponse = z.infer<typeof SpotifyArtistSearchResponseSchema>

export type SpotifyArtist = z.infer<typeof SpotifyArtistSchema>

export type SpotifyFollowers = z.infer<typeof SpotifyFollowersSchema>

export type SpotifyExternalUrls = z.infer<typeof SpotifyExternalUrlsSchema>

export type SpotifyImage = z.infer<typeof SpotifyImageSchema>
