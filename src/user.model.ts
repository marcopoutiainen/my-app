import { Schema, Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
});
