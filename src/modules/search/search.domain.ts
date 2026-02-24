import z from "zod";
import { SpotifyAlbumSearchResponseSchema } from "../album/album.schema";
import { SpotifyArtistSearchResponseSchema } from "../artist/artist.schema";
import { SpotifyTrackSearchResponseSchema } from "../track/track.schema";
import { Album } from "../album/album.domain";
import { Track } from "../track/track.domain";
import { Artist } from "../artist/artist.domain";

export interface SpotifySearchResult {
  albums?: z.infer<typeof SpotifyAlbumSearchResponseSchema>;
  artists?: z.infer<typeof SpotifyArtistSearchResponseSchema>;
  tracks?: z.infer<typeof SpotifyTrackSearchResponseSchema>;
}

export interface SearchResponse {
  albums?: Album[];
  tracks?: Track[];
  artists?: Artist[];
}
