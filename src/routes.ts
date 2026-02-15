import { Router } from "express";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { albumRoutes } from "./modules/album/album.routes";
import { trackRoutes } from "./modules/track/track.routes";
import { ratingRoutes } from "./modules/rating/rating.routes";
import { likeRoutes } from "./modules/like/like.routes";
import { searchRoutes } from "./modules/search/search.routes";
import { artistRoutes } from "./modules/artist/artist.routes";

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/album', albumRoutes)
router.use('/track', trackRoutes)
router.use('/rating', ratingRoutes)
router.use('/like', likeRoutes)
router.use('/search', searchRoutes)
router.use('/artist', artistRoutes)

export { router }
