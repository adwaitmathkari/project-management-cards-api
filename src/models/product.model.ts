import {model, Schema, Model, Document} from 'mongoose';

export interface IProduct extends Document {
  title: string;
  price: number;
}

const ProductSchema: Schema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},

});

export const ProductModel: Model<IProduct> = model<IProduct>('Product', ProductSchema);
