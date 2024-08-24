const mongoose = require('mongoose');

interface IChat {
    ChatID: number;
    UserIDa: number;
    UserIDb: number;
}

const ChatSchema = new Schema<IChat>({
    ChatID: {type: Number, Required: true},
    UserIDa: {type: Number, Required: true},
    userIDb: {type: Number, required: true},
})

const Chat = mongoose.model<IChat>("Chat", ChatSchema)

export default Chat;
