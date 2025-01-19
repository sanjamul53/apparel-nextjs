import mongoose from "mongoose";

export const stringToObjectId = (str: string) => new mongoose.Types.ObjectId(str);