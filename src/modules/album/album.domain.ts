import z from "zod";
import { AlbumSchema, SpotifyAlbumSchema, SpotifyAlbumSearchResponseSchema } from "./album.schema";

export type SpotifyAlbumSearchResponse = z.infer<typeof SpotifyAlbumSearchResponseSchema>

export type SpotifyAlbum = z.infer<typeof SpotifyAlbumSchema>

export type Album = z.infer<typeof AlbumSchema>
