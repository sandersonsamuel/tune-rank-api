import { SpotifyGateway } from "../../shared/gateways/spotify.gateway";

export class SearchService {
    constructor(
        private readonly spotifyGateway: SpotifyGateway
    ) {}

    search = async (query: string) => {
        const search = await this.spotifyGateway.search(query);
        return search;
    };
}
