import { env } from "@/configs/env";
import { SpotifyGateway } from "@/shared/gateways/spotify.gateway";
import { SpotifyAlbum, SpotifyAlbumSearchResponse } from "@/modules/album/album.domain";
import { SpotifyTrack, SpotifyTrackSearchResponse } from "@/modules/track/track.domain";
import { SpotifyArtist } from "@/modules/artist/artist.domain";
import { SpotifySearchResult } from "@/modules/search/search.domain";


export class SpotifyHttpGateway implements SpotifyGateway {

    private readonly baseUrl = env.SPOTIFY_BASE_URL
    private token: string | null = null
    private tokenExpiresAt: number = 0

    private async getAccessToken(){
        if(this.token && Date.now() < this.tokenExpiresAt){
            return this.token
        }

        const response = await fetch(env.SPOTIFY_AUTH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString("base64")}`
            },
            body: "grant_type=client_credentials"
        })

        const data = await response.json() as { access_token: string, expires_in: number }
        this.token = data.access_token
        this.tokenExpiresAt = Date.now() + data.expires_in * 1000
        return this.token
    }

    private async request<T>(path: string, options: RequestInit = {}){

        const token = await this.getAccessToken()

        const response = await fetch(`${this.baseUrl}/${path}`, {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${token}`
            }
        })
        return response.json() as Promise<T>
    }

    async getAlbum(id: string): Promise<SpotifyAlbum> {
        return this.request(`albums/${id}`)
    }

    async getAlbums(ids: string[]): Promise<{ albums: SpotifyAlbum[] }> {
        return this.request<{ albums: SpotifyAlbum[] }>(`albums?ids=${ids.join(",")}`)
    }

    async getTrack(id: string): Promise<SpotifyTrack> {
        return this.request(`tracks/${id}`)
    }

    async getTracks(ids: string[]): Promise<{ tracks: SpotifyTrack[] }> {
        return this.request<{ tracks: SpotifyTrack[] }>(`tracks?ids=${ids.join(",")}`)
    }

    async getArtist(id: string): Promise<SpotifyArtist> {
        return this.request(`artists/${id}`)
    }

    async search(query: string): Promise<SpotifySearchResult> {
        return this.request(`search?q=${encodeURIComponent(query)}&type=track,album,artist`)
    }
}