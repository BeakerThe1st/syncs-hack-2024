import { Schema, model} from 'mongoose';

interface IMessage {
    MessageID: number;
    MessageContent: string;
    ChatID: number;
    UserID: number;
}

const MessageSchema = new Schema<IMessage>({
    MessageID: {type: Number, required: true},
    MessageContent: {type: String, required: true},
    ChatID: {type: Number, required: true},
    UserID: {type: Number, required: true}
})

const Message = model<IMessage>("Message", MessageSchema)
export default Message;