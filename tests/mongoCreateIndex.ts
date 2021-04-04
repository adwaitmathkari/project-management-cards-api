// import { model, Schema, Model, Document } from 'mongoose';
// import * as Mongoose from 'mongoose';
// // require('dotenv').config();

// const connectDB = () => {

//     let database: Mongoose.Connection;

//     const url = 'mongodb://127.0.0.1:27017/taskManagementDB';
//     console.log('from connect :::', url);

//     if (database) {
//         return;
//     }

//     Mongoose.connect(url, {
//         useNewUrlParser: true,
//         useFindAndModify: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//     });

//     database = Mongoose.connection;

//     database.once('open', async () => {
//         console.log('Connected to database');
//     });

//     database.on('error', () => {
//         console.log('Error connecting to database');
//     });

// };



// export interface IProduct extends Document {
//     title: string;
//     price: number;
// }

// const ProductSchema: Schema = new Schema({
//     title: { type: String, required: true },
//     price: { type: Number, required: true },

// });

// export const ProductModel: Model<IProduct> = model<IProduct>('Product', ProductSchema);


// let response;
// for (let i = 0; i < 100; i++) {
//     // if (i % 10000 == 9999) console.log('adding', i);
//     try {
//         response = ProductModel.create({ title: `product${i} 1`, price: i });
//     } catch (err) {
//         console.log(err);
//     }
// }


// module.exports = connectDB;