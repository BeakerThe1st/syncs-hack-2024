const mongoose = require('mongoose');

interface IChat {
    ChatID: number;
    UserIDa: number;
    UserIDb: number;
}

const ChatSchema = new Schema<IChat>({
    ChatID: {type: number, Required: true},
    UserIDa: {type: number, Required: true},
    userIDb: {type: number, required: true},
})