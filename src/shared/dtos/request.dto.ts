import { Request } from "express";

export type TypedRequest<P = {}, B = {}, Q = {}> = Request<P, any, B, Q>;

export type ParamIdRequestType = TypedRequest<{ id: string }>;