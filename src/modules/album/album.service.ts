import createHttpError from "http-errors";
import { SpotifyGateway } from "../../shared/gateways/spotify.gateway";

export class AlbumService {
    constructor(
        private readonly spotifyGateway: SpotifyGateway
    ) {}

    findById = async (id: string) => {
        const album = await this.spotifyGateway.getAlbum(id);
        
        if (!album) {
            throw createHttpError.NotFound("Album not found");
        }
        
        return album;
    };

    findManyByIds = async (ids: string[]) => {
        const data = await this.spotifyGateway.getAlbums(ids);
        
        if (!data) {
            throw createHttpError.NotFound("Album not found");
        }
        
        return data.albums
    };
}
