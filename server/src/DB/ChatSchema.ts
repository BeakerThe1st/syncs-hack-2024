const mongoose = require('mongoose');

interface IChat {
    ChatID: number;
    SongIDa: number;
    SongIDb: number;
}

const ChatSchema = new Schema<IChat>({
    ChatID: {type: Number, Required: true},
    SongIDa: {type: Number, Required: true},
    SongIDb: {type: Number, required: true},
})

const Chat = mongoose.model<IChat>("Chat", ChatSchema)

export default Chat;
