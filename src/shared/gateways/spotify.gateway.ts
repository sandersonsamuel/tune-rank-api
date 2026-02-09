import { SpotifyArtist } from "@/@types/spotify/artist"
import { SpotifySearchResult } from "@/@types/spotify/search"
import { SpotifyTrack, SpotifyTrackSearchResponse } from "@/@types/spotify/track"
import { SpotifyAlbum, SpotifyAlbumSearchResponse } from "@/modules/album/album.domain"

export interface SpotifyGateway {
  getAlbum(id: string): Promise<SpotifyAlbum>
  getAlbums(ids: string[]): Promise<SpotifyAlbumSearchResponse>
  getTrack(id: string): Promise<SpotifyTrack>
  getTracks(ids: string[]): Promise<SpotifyTrackSearchResponse>
  getArtist(id: string): Promise<SpotifyArtist>
  search(query: string): Promise<SpotifySearchResult>
}