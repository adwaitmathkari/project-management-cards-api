import * as Mongoose from 'mongoose';
// require('dotenv').config();

let database: Mongoose.Connection;

export const connectDB = () => {

    const url = 'mongodb://127.0.0.1:27017/taskManagementDB';
    console.log('from connect :::',url);

    if (database) {
        return;
    }
    
    Mongoose.connect(url, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    
    database = Mongoose.connection;

    database.once('open', async () => {
        console.log('Connected to database');
    });
      
    database.on('error', () => {
        console.log('Error connecting to database');
    });

};

export const ObjectId = Mongoose.Types.ObjectId;

export const disconnect = () => {
    
    if (!database) {
        return;
    }
    
    Mongoose.disconnect();

    database.once('close', async () => {
        console.log('Diconnected  to database');
    });

};