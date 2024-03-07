import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  address?: string;
  coordinates?: number[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  coordinates: { type: [Number], required: false },
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
