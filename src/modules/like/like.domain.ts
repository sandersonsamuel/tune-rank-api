import { RatingType } from "../rating/rating.domain";

export interface Like {
    id: string;
    releaseId: string;
    type: RatingType
}
