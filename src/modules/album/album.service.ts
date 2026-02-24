import createHttpError from "http-errors";
import { SpotifyGateway } from "../../shared/gateways/spotify.gateway";
import { Album, SpotifyAlbum } from "./album.domain";

export class AlbumService {
    constructor(
        private readonly spotifyGateway: SpotifyGateway
    ) { }

    formatAlbum = (album: SpotifyAlbum): Album => ({
        id: album.id,
        name: album.name,
        images: album.images.map(img => ({ url: img.url, height: img.height, width: img.width })),
        release_date: album.release_date,
        type: album.type,
        artists: album.artists.map(a => ({ id: a.id, name: a.name, type: a.type })),
        tracks: album.tracks && album.tracks.items.map(t => ({ id: t.id, name: t.name, artists: t.artists.map(a => ({ id: a.id, name: a.name, type: a.type })) })),
    });

    findById = async (id: string) => {
        const album = await this.spotifyGateway.getAlbum(id);

        if (!album) {
            throw createHttpError.NotFound("Album not found");
        }

        return this.formatAlbum(album);
    };

    findManyByIds = async (ids: string[]) => {
        const data = await this.spotifyGateway.getAlbums(ids);

        if (!data) {
            throw createHttpError.NotFound("Album not found");
        }

        return data.albums.map(this.formatAlbum);
    };
}
