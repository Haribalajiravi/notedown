import mongoose, { Schema, Document } from 'mongoose';

export interface IGoogleUser extends Document {
  id: string;
  email: string;
  displayName: string;
  thumbImage: string;
}

export interface IUser extends Document {
  method: string;
  google: IGoogleUser;
}

const userSchema: Schema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
  },
  google: {
    id: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
    },
    thumbImage: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
  },
});

export default mongoose.model<IUser>('user', userSchema);
