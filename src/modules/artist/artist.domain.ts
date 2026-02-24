import z from "zod";
import { ArtistSchema, SpotifyArtistSchema } from "./artist.schema";

export type SpotifyArtist = z.infer<typeof SpotifyArtistSchema>

export type Artist = z.infer<typeof ArtistSchema>
