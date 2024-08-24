const mongoose = require('mongoose');

interface IMessage {
    MessageID: number;
    MessageContent: string;
    ChatID: number;
}

const MessageSchema = new Schema<IMessage>({
    MessageID: {type: number, required: true},
    MessageContent: {type: string, required: true},
    ChatID: {type: number, required: true}
})