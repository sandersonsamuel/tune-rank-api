import { IHashProvider } from "../../../providers/hash.provider";
import bcrypt from 'bcrypt'
import createHttpError from "http-errors";

export class BcryptRepository implements IHashProvider {

    async generateHash(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10)

        if (!hash) {
            throw new createHttpError.InternalServerError('Failed to generate hash')
        }

        return hash
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}