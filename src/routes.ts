import { Router } from "express";
import { userRoutes } from "@/modules/user/user.routes";
import { authRoutes } from "@/modules/auth/auth.routes";

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)

export { router }
