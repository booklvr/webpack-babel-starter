'use strict';

import mongoose from 'mongoose';

import User from './user';
import Message from './message';


const connectDb = () => {
  return mongoose
    .connect(process.env.DATABASE_URL, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
    });
};

const models = { User, Message };

export { connectDb };

export default models;
