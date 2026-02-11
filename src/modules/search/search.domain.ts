import { SpotifyAlbumSearchResponse } from "../album/album.domain";
import { SpotifyArtistSearchResponse } from "../artist/artist.domain";
import { SpotifyTrackSearchResponse } from "../track/track.domain";

export interface SpotifySearchResult {
  albums?: SpotifyAlbumSearchResponse;
  artists?: SpotifyArtistSearchResponse;
  tracks?: SpotifyTrackSearchResponse;
}
