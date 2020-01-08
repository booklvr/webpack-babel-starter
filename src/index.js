// SOURCE: https://www.robinwieruch.de/node-express-server-rest-api

import 'dotenv/config';
import cors from 'cors'; //creates a cors header to prevent "Cross-Origin Request Blocked errors"
import express from 'express';  //Creates Express Server

import  { hello } from './my-other-file';
import { users, messages } from './data';


const app = express();

app.use(cors()); // add CORS HTTP header to every request by default


app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

// app.get('/test', (req, res) => {
//     res.send('This is a test');
// })
// HOMEPAGE
app.post('/', (req, res) => {
   return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Recieved a DELETE HTTP method');
})


// USER
app.get('/users', (req, res) => {
    return res.send(Object.values(users));
});

app.post('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.put('/users/:Id', (req, res) => {
    return res.send(`PUT HTTP methodon on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP methodon on user/${req.params.userId} resource`);
});

// console.log(users);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});


