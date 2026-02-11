import z from "zod/v4";
import { LikeSchema } from "./like.schema";

export type Like = z.infer<typeof LikeSchema>;
