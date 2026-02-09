export interface SpotifyAlbumSearchResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyAlbum[];
}

export interface SpotifyAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  tracks: AlbumTracks;
  artists: SpotifyArtist[];
}

export interface AlbumTracks {
  href: string
  limit: number
  next: any
  offset: number
  previous: any
  total: number
  items: SpotifyTrackItemInAlbum[]
}

export interface SpotifyTrackItemInAlbum {
  artists: SpotifyArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: SpotifyExternalUrls
  href: string
  id: string
  name: string
  preview_url: any
  track_number: number
  type: string
  uri: string
  is_local: boolean
}

export interface SpotifyTracks {
  href: string;
  total: number;
}

export interface SpotifyArtist {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}
