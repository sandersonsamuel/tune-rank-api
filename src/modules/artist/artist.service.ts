import createHttpError from "http-errors";
import { SpotifyGateway } from "../../shared/gateways/spotify.gateway";
import { Artist } from "./artist.domain";
import { TrackService } from "../track/track.service";
import { AlbumService } from "../album/album.service";

export class ArtistService {
    constructor(
        private readonly spotifyGateway: SpotifyGateway,
        private readonly trackService: TrackService,
        private readonly albumService: AlbumService
    ) { }

    private formatArtist = (artist: { id: string; name: string; images: any[]; type: string }): Artist => ({
        id: artist.id,
        name: artist.name,
        images: artist.images.map(img => ({ url: img.url, height: img.height, width: img.width })),
        type: artist.type,
    });

    findTopTracks = async (id: string) => {
        const tracks = await this.spotifyGateway.getArtistTopTracks(id);

        if (!tracks) {
            throw createHttpError.NotFound("Artist top tracks not found");
        }

        return tracks.tracks.map(this.trackService.formatTrack);
    }

    findAlbums = async (id: string) => {
        const albums = await this.spotifyGateway.getArtistAlbums(id);

        if (!albums) {
            throw createHttpError.NotFound("Artist albums not found");
        }

        console.log(albums)

        return albums.items.map(this.albumService.formatAlbum);
    }


    findById = async (id: string) => {
        const artist = await this.spotifyGateway.getArtist(id);

        if (!artist) {
            throw createHttpError.NotFound("Artist not found");
        }

        return this.formatArtist(artist);
    };
}
