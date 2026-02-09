export interface IHashProvider {
    generateHash(password: string): Promise<string>
    compareHash(password: string, hash: string): Promise<boolean>
}