import { Router } from "express";
import { userRoutes } from "@/modules/user/user.routes";
import { authRoutes } from "@/modules/auth/auth.routes";
import { albumRoutes } from "@/modules/album/album.routes";
import { trackRoutes } from "@/modules/track/track.routes";
import { ratingRoutes } from "@/modules/rating/rating.routes";

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/album', albumRoutes)
router.use('/track', trackRoutes)
router.use('/rating', ratingRoutes)

export { router }
