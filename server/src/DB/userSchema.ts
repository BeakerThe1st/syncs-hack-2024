const mongoose = require('mongoose');

interface Iuser {
    UserID: number;
    SongID: number;
}

const userSchema = new Schema<Iuser>({
    UserID: { type: number, required: true },
    SongID: { type: number, required: true },
})
