const mongoose = require('mongoose');

interface IUser {
    UserID: number;
    SongID: string;
}

const UserSchema = new Schema<IUser>({
    UserID: { type: Number, required: true },
    SongID: { type: String },
})

const User = mongoose.model<IUser>("User", UserSchema)
export default User;

