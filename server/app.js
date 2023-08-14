import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';
import postsRoutes from './routes/posts.routes.js';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//middlewares
app.use(cors());
// to see the request in the console
app.use(morgan('dev'));
//to read json data
app.use(express.json());
//to read urlencoded data
app.use(
  fileUpload({
    useTempFiles: true, //to save the file in the temp folder
    tempFileDir: './upload/', //to specify the temp folder
  })
);
//routes
app.use(postsRoutes);

console.log(join(__dirname, '../client/build'));
app.use(express.static(join(__dirname, '../client/build')));

export default app;
