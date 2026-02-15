import createHttpError from "http-errors";
import { SpotifyGateway } from "../../shared/gateways/spotify.gateway";

export class ArtistService {
    constructor(
        private readonly spotifyGateway: SpotifyGateway
    ) {}

    findById = async (id: string) => {
        const artist = await this.spotifyGateway.getArtist(id);
        
        if (!artist) {
            throw createHttpError.NotFound("Artist not found");
        }
        
        return artist;
    };
}
