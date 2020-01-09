// SOURCE: https://www.robinwieruch.de/node-express-server-rest-api

import 'dotenv/config';
import cors from 'cors'; //creates a cors header to prevent "Cross-Origin Request Blocked errors"
import express from 'express';  //Creates Express Server
import uuidv4 from 'uuid/v4';

import  { hello } from './my-other-file';
import { users, messages } from './data';

const app = express();

app.use(express.json()); // body-parser - parses incoming request stream and makes it accessible on req.body and exposes it as json
app.use(express.urlencoded({ extended: true }));  // parses the text as url encoded data (how browsers tend to send form data) and exposes resulting object of keys and values on req.body

app.use(cors()); // add CORS HTTP header to every request by default

// MIDDLEWARE
// * middleware comes first
app.use((req, res, next) => {
    // do something
    req.me = users[1];  // pseudo authenticated user


    next();
})

// SESSION
app.get('/session', (req, res) => {
    return res.send(users[req.me.id]);
})

// HOMEPAGE
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

// app.get('/test', (req, res) => {
//     res.send('This is a test');
// })

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

// MESSAGES
app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
});

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id
    };
    console.log(req.me);

    messages[id] = message;

    return res.send(message);
});

app.put('/users/:Id', (req, res) => {
    return res.send(`PUT HTTP methodon on user/${req.params.userId} resource`);
});

app.delete('/messages/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = messages;

    return res.send(message);
});



// console.log(users);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});


