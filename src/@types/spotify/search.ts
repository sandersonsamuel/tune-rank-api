import { SpotifyAlbumSearchResponse } from "./album";
import { SpotifyArtistSearchResponse } from "./artist";
import { SpotifyTrackSearchResponse } from "./track";

export interface SpotifySearchResult {
  albums?: SpotifyAlbumSearchResponse;
  artists?: SpotifyArtistSearchResponse;
  tracks?: SpotifyTrackSearchResponse;
}
