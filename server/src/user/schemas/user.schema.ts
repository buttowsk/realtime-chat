import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
});

export interface User {
  username: string;
  password: string;
  email: string;
}
