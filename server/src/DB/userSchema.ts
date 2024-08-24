const mongoose = require('mongoose');

interface IUser {
    UserID: number;
    SongID: number;
}

const UserSchema = new Schema<IUser>({
    UserID: { type: number, required: true },
    SongID: { type: number, required: true },
})
