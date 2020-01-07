import 'dotenv/config';
import cors from 'cors'; //creates a cors header to prevent "Cross-Origin Request Blocked errors"
import express from 'express';  //Creates Express Server

import  { hello } from './my-other-file';


const app = express();

app.use(cors()); // add CORS HTTP header to every request by default


app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/test', (req, res) => {
    res.send('This is a test');
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});


