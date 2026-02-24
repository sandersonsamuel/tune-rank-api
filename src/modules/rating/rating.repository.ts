import { Rating } from "./rating.domain";
import { CreateRatingDtoType } from "./rating.dto";

export interface RatingRepository {
    create(data: CreateRatingDtoType, userId: string): Promise<Rating>;
    findOneByReleaseAndUserId(releaseId: string, userId: string): Promise<Rating | null>;
    findByUserId(userId: string): Promise<Rating[] | []>;
    findManyByReleaseId(releaseId: string): Promise<Rating[] | []>;
}
