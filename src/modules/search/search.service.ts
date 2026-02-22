import { SpotifyGateway } from "../../shared/gateways/spotify.gateway";

export class SearchService {
    constructor(
        private readonly spotifyGateway: SpotifyGateway
    ) { }

    search = async (query: string) => {
        const search = await this.spotifyGateway.search(query);

        return {
            albums: search.albums?.items.slice(0, 5).map((album) => ({
                id: album.id,
                name: album.name,
                images: album.images,
                release_date: album.release_date,
                type: album.type,
                artists: album.artists,
            })),
            tracks: search.tracks?.items.slice(0, 5).map((track) => ({
                id: track.id,
                name: track.name,
                images: track.album.images,
                release_date: track.album.release_date,
                type: track.album.type,
                artists: track.artists,
            })),
            artists: search.artists?.items.slice(0, 5).map((artist) => ({
                id: artist.id,
                name: artist.name,
                images: artist.images,
                type: artist.type,
            })),
        }
    };
}
