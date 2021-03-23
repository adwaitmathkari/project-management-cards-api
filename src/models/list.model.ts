import { model, Schema, Model, Document } from 'mongoose';

export interface IList extends Document {
    title: string;
    cards: any;
}

const ListSchema: Schema = new Schema({
    title: { type: String, required: true },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Cards'}]
});

export const ListModel: Model<IList> = model<IList>('List', ListSchema);