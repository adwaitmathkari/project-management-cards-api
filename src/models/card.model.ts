import { model, Schema, Model, Document } from 'mongoose';

export interface ICard extends Document {
    title: string;
    description: string;
    assignee: any;
}

const CardSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignee: { type: Schema.Types.ObjectId, ref: 'Users'}
});

export const CardModel: Model<ICard> = model<ICard>('Card', CardSchema);