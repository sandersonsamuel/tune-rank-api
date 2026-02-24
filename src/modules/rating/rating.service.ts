import createHttpError from "http-errors";
import { RatingRepository } from "./rating.repository";
import { CreateRatingDtoType } from "./rating.dto";
import { UserRepository } from "../user/user.repository";
import { AlbumService } from "../album/album.service";
import { TrackService } from "../track/track.service";
import { StatusCodes } from "http-status-codes";

export class RatingService {
    constructor(
        private readonly ratingRepository: RatingRepository,
        private readonly userRepository: UserRepository,
        private readonly albumService: AlbumService,
        private readonly trackService: TrackService
    ) { }

    create = async (data: CreateRatingDtoType, userId: string) => {

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw createHttpError(StatusCodes.NOT_FOUND, "User not found");
        }

        if (data.type === "ALBUM") {
            const album = await this.albumService.findById(data.releaseId);
            if (!album) {
                throw createHttpError(StatusCodes.NOT_FOUND, "Album not found");
            }
        }

        if (data.type === "TRACK") {
            const track = await this.trackService.findById(data.releaseId);
            if (!track) {
                throw createHttpError(StatusCodes.NOT_FOUND, "Track not found");
            }
        }

        return await this.ratingRepository.create(data, userId);
    };

    getByUserId = async (userId: string) => {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw createHttpError(StatusCodes.NOT_FOUND, "User not found");
        }

        const ratings = await this.ratingRepository.findByUserId(userId);

        if (ratings.length === 0) {
            return [];
        }

        const albumsRatins = ratings.filter(a => a.type === "ALBUM");
        const tracksRatins = ratings.filter(a => a.type === "TRACK");

        const albumIds = [...new Set(albumsRatins.map(a => a.releaseId))]
        const trackIds = [...new Set(tracksRatins.map(a => a.releaseId))];

        const [albums, tracks] = await Promise.all([
            albumIds.length > 0 ? this.albumService.findManyByIds(albumIds) : [],
            trackIds.length > 0 ? this.trackService.findManyByIds(trackIds) : []
        ]);

        const albumsMap = new Map(albums.map(album => [album.id, album]));
        const tracksMap = new Map(tracks.map(track => [track.id, track]));

        return {
            albums: albumsRatins.map(rating => {
                return {
                    ...rating,
                    album: albumsMap.get(rating.releaseId)
                };
            }),
            tracks: tracksRatins.map(rating => {
                return {
                    ...rating,
                    track: tracksMap.get(rating.releaseId)
                };
            })
        }
    };

    getRatingsByReleaseId = async (releaseId: string) => {
        const ratings = await this.ratingRepository.findManyByReleaseId(releaseId);

        const ratingsByRating = Array.from({ length: 10 }, (_, index) => {
            return {
                rating: (index + 1) / 2,
                count: ratings.filter(r => r.rating === (index + 1) / 2).length
            }
        })

        return {
            distribution: ratingsByRating,
            average: ratings.length > 0 ? ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length : 0,
            total: ratings.length
        }
    }

    getRatingByReleaseAndUserId = async (releaseId: string, userId: string) => {
        return await this.ratingRepository.findOneByReleaseAndUserId(releaseId, userId);
    }
}
