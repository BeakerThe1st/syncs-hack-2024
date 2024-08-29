import { Schema, model} from 'mongoose';

interface IUser {
    UserID: number;
    SongID: string;
}

const UserSchema = new Schema<IUser>({
    UserID: { type: Number, required: true },
    SongID: { type: String },
})

const User = model<IUser>("User", UserSchema)
export default User;

