import { CreateUserDtoType } from "@/modules/user/user.dto";
import { UserRepository } from "@/modules/user/user.repository";
import { UserModel } from "../models/user.model";
import createHttpError from "http-errors";

export class MongoUserRepository implements UserRepository {

    async create(user: CreateUserDtoType) {

        const newUser = await UserModel.create(user);

        if (!newUser) {
            throw new createHttpError.InternalServerError("User could not be created");
        }

        return {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };
    }

    async findById(id: string) {
        const user = await UserModel.findById(id)
        return user
    }

    async findByEmail(email: string) {
        const user = await UserModel.findOne({ email })
        return user
    }

    async findManyByIds(ids: string[]) {
        const users = await UserModel.find({ _id: { $in: ids } })
        return users
    }

}