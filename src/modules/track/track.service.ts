import { SpotifyGateway } from "../../shared/gateways/spotify.gateway";
import createHttpError from "http-errors";
import { Track } from "./track.domain";

export class TrackService {
    constructor(
        private readonly spotifyGateway: SpotifyGateway
    ) { }

    formatTrack = (track: { id: string; name: string; album: { images: any[]; release_date: string; type: string }; artists: any[] }): Track => ({
        id: track.id,
        name: track.name,
        images: track.album.images.map(img => ({ url: img.url, height: img.height, width: img.width })),
        release_date: track.album.release_date,
        type: track.album.type,
        artists: track.artists.map(a => ({ id: a.id, name: a.name, type: a.type })),
    });

    findById = async (id: string) => {
        const track = await this.spotifyGateway.getTrack(id);

        if (!track) {
            throw createHttpError.NotFound("Track not found");
        }

        return this.formatTrack(track);
    };

    findManyByIds = async (ids: string[]) => {
        const data = await this.spotifyGateway.getTracks(ids);

        if (!data) {
            throw createHttpError.NotFound("Tracks not found");
        }

        return data.tracks.map(this.formatTrack);
    };
}
