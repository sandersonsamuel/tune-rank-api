import z from "zod";
import { SpotifyTrackSchema, SpotifyTrackSearchResponseSchema, TrackSchema } from "./track.schema";

export type SpotifyTrackSearchResponse = z.infer<typeof SpotifyTrackSearchResponseSchema>

export type SpotifyTrack = z.infer<typeof SpotifyTrackSchema>

export type Track = z.infer<typeof TrackSchema>
