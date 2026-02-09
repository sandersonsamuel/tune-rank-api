import { SpotifyAlbum, SpotifyAlbumSearchResponse } from "@/@types/spotify/album"
import { SpotifySearchResult } from "@/@types/spotify/search"
import { SpotifyTrack } from "@/@types/spotify/track"

export interface SpotifyGateway {
  getAlbum(id: string): Promise<SpotifyAlbum>
  getAlbums(ids: string[]): Promise<SpotifyAlbumSearchResponse[]>
  getTrack(id: string): Promise<SpotifyTrack>
  search(query: string): Promise<SpotifySearchResult>
}