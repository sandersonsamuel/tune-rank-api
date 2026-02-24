import { Response, Request } from "express";
import { CreateUserRequestType, LoginUserRequestType } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { TypedRequest } from "../../shared/dtos/request.dto";
import createHttpError from "http-errors";

export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    me = async (req: TypedRequest, res: Response) => {
        const { userId } = req.user;
        const user = await this.userService.findById(userId);
        return res.status(200).json(user);
    }

    register = async (req: CreateUserRequestType, res: Response) => {
        const { name, email, password } = req.body
        const user = await this.userService.createUser({ name, email, password })
        return res.status(201).json(user)
    }

    login = async (req: LoginUserRequestType, res: Response) => {
        const { email, password } = req.body
        const { accessToken, refreshToken } = await this.authService.login({ email, password })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24, // 1 dia
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semana
        })

        return res.status(200).json({
            success: true
        })
    }

    logout = async (req: Request, res: Response) => {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })

        await this.authService.logout(req.user.userId)

        return res.status(200).json({
            success: true
        })
    }

    refreshAccessToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies || {};

        if (!refreshToken) {
            throw new createHttpError.Unauthorized("Refresh token not found");
        }

        const { accessToken } = await this.authService.refreshAccessToken(refreshToken)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24, // 1 dia
        })

        return res.status(200).json({
            success: true
        })
    }

}