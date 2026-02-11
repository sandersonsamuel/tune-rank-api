import z from "zod";
import { SpotifyArtistSummarySchema, SpotifyExternalIdsSchema, SpotifyExternalUrlsSchema, SpotifyTrackSchema, SpotifyTrackSearchResponseSchema } from "./track.schema";

export type SpotifyTrackSearchResponse = z.infer<typeof SpotifyTrackSearchResponseSchema>

export type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>

export type SpotifyArtistSummary = z.infer<typeof SpotifyArtistSummarySchema>

export type SpotifyExternalIds = z.infer<typeof SpotifyExternalIdsSchema>

export type SpotifyExternalUrls = z.infer<typeof SpotifyExternalUrlsSchema>
