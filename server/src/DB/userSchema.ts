const mongoose = require('mongoose');

interface IUser {
    UserID: number;
    SongID: number;
}

const UserSchema = new Schema<IUser>({
    UserID: { type: Number, required: true },
    SongID: { type: Number, required: true },
})

const User = mongoose.model<IUser>("User", UserSchema)
export default User;

