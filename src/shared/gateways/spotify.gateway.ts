import { SpotifyAlbum } from "../../modules/album/album.domain"
import { SpotifyArtist } from "../../modules/artist/artist.domain"
import { SpotifySearchResult } from "../../modules/search/search.domain"
import { SpotifyTrack } from "../../modules/track/track.domain"

export interface SpotifyGateway {
  getAlbum(id: string): Promise<SpotifyAlbum>
  getAlbums(ids: string[]): Promise<{ albums: SpotifyAlbum[] }>
  getTrack(id: string): Promise<SpotifyTrack>
  getTracks(ids: string[]): Promise<{ tracks: SpotifyTrack[] }>
  getArtist(id: string): Promise<SpotifyArtist>
  search(query: string): Promise<SpotifySearchResult>
  getArtistAlbums(id: string): Promise<{ items: SpotifyAlbum[] }>
  getArtistTopTracks(id: string): Promise<{ tracks: SpotifyTrack[] }>
}