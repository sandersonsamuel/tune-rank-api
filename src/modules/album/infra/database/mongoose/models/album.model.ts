import { model, Schema } from "mongoose";

const albumSchema = new Schema({
    // Adicione os campos aqui
    // exemplo:
    // name: {
    //     type: String,
    //     required: true,
    // },
}, { timestamps: true });

export const AlbumModel = model("Album", albumSchema);
