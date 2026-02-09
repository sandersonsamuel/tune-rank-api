import { SpotifyGateway } from "@/shared/gateways/spotify.gateway";
import createHttpError from "http-errors";

export class TrackService {
    constructor(
        private readonly spotifyGateway: SpotifyGateway
    ) {}

    findById = async (id: string) => {
        const track = await this.spotifyGateway.getTrack(id);
        
        if (!track) {
            throw createHttpError.NotFound("Track not found");
        }
        
        return track;
    };

    findManyByIds = async (ids: string[]) => {
        const tracks = await this.spotifyGateway.getTracks(ids);
        
        if (!tracks) {
            throw createHttpError.NotFound("Tracks not found");
        }
        
        return tracks;
    };
}
