import express from 'express';
import mongoose from 'mongoose';
import { insert_data } from './controller/insert_data/index';

const app = express();

// app.get('/baseCategory', baseCategory_controller);
app.get('/test', insert_data);

mongoose.connect('mongodb://127.0.0.1:27017/apparel')
.then(()=> {

  // console.log('db connected');

  app.listen(8001);

  insert_data();

})





