import { Response } from "express";
import { CreateUserRequestType, LoginUserRequestType } from "./user.dto";
import { UserService } from "./user.service";
import { TypedRequest } from "@/shared/dtos/request.dto";

export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    getUserById = async (req: TypedRequest<{ id: string }>, res: Response) => {
        const { id } = req.params
        const user = await this.userService.findById(id)
        return res.status(200).json(user)
    }

    createUser = async (req: CreateUserRequestType, res: Response) => {

        const { name, email, password } = req.body

        const user = await this.userService.createUser({ name, email, password })
        return res.status(201).json(user)
    }

    loginUser = async (req: LoginUserRequestType, res: Response) => {
        const { email, password } = req.body

        const user = await this.userService.loginUser({ email, password })
        return res.status(200).json(user)
    }

}