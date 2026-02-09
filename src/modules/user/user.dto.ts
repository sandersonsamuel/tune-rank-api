import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const CreateUserDto = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
}).openapi("CreateUserDto")

export const CreateUserRequest = z.object({
    body: CreateUserDto
})

export const LoginUserDto = z.object({
    email: z.email(),
    password: z.string().min(6),
}).openapi("LoginUserDto")

export const LoginUserRequest = z.object({
    body: LoginUserDto
})

export type CreateUserDtoType = z.infer<typeof CreateUserDto>
export type CreateUserRequestType = z.infer<typeof CreateUserRequest>

export type LoginUserDtoType = z.infer<typeof LoginUserDto>
export type LoginUserRequestType = z.infer<typeof LoginUserRequest>

