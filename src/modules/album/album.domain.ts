import z from "zod";
import { SpotifyAlbumSchema, SpotifyAlbumSearchResponseSchema, SpotifyArtistInAlbumSchema, SpotifyExternalUrlsSchema, SpotifyImageSchema, SpotifyTrackItemInAlbumSchema } from "./album.schema";

export type SpotifyAlbumSearchResponse = z.infer<typeof SpotifyAlbumSearchResponseSchema>

export type SpotifyAlbum = z.infer<typeof SpotifyAlbumSchema>

export type SpotifyTrackItemInAlbum = z.infer<typeof SpotifyTrackItemInAlbumSchema>

export type SpotifyArtistInAlbum = z.infer<typeof SpotifyArtistInAlbumSchema>

export type SpotifyExternalUrls = z.infer<typeof SpotifyExternalUrlsSchema>

export type SpotifyImage = z.infer<typeof SpotifyImageSchema>
