import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true }
});

export const UserModel: Model<IUser> = model<IUser>('User', UserSchema);