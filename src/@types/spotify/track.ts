import { SpotifyAlbum } from "./album";

export interface SpotifyArtistSummary {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
  [key: string]: string | undefined;
}

export interface SpotifyExternalUrls {
  spotify: string;
  [key: string]: string | undefined;
}


export interface SpotifyTrackSearchResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyTrack[];
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtistSummary[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track"
  uri: string;
}
