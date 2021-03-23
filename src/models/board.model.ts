import { model, Schema, Model, Document } from 'mongoose';

export interface IBoard extends Document {
    title: string;
    description: string;
    users: any;
    lists: any;
}

const BoardSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'Users'}],
    lists: [{ type: Schema.Types.ObjectId, ref: 'Lists'}]
});

export const BoardModel: Model<IBoard> = model<IBoard>('Board', BoardSchema);