// SOURCE: https://www.robinwieruch.de/node-express-server-rest-api

import 'dotenv/config';
import cors from 'cors'; //creates a cors header to prevent "Cross-Origin Request Blocked errors"
import express from 'express';  //Creates Express Server
import uuidv4 from 'uuid/v4';

import routes from './routes';

import models, { connectDb } from './models';

const app = express();

// MIDDLEWARE
// * middleware comes first
app.use((req, res, next) => {
    // do something
    req.context = {
        models,
        me: models.users[1] // pseudo authenticated user
    };
    next();
});

app.use(express.json()); // body-parser - parses incoming request stream and makes it accessible on req.body and exposes it as json
app.use(express.urlencoded({ extended: true }));  // parses the text as url encoded data (how browsers tend to send form data) and exposes resulting object of keys and values on req.body

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);


app.use(cors()); // add CORS HTTP header to every request by default

const eraseDataBaseOnSync = true; // re-initialize database every Express server start

connectDb().then(async () => {

     // re-initialize database every Express server start
    if (eraseDataBaseOnSync) {
        await Promise.all([
            models.User.deleteMany({}),
            models.Message.deleteMany({}),
        ]);

        createUsersWithMessages();
    };

    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}!`);
    });
});

const createUsersWithMessages = async () => {
    const user1 = new models.User({
        username: 'ndewaal',
    });

    const user2 = new models.User({
        username: 'hadajang',
    });

    const message1 = new models.Message({
        text: 'Learning how to codoe',
        user: user1.id,
    });

    const message2 = new models.Message({
        text: 'is a little sad today',
        user: user2.id,
    });

    const message3 = new models.Message({
        text: 'is a little sad today',
        user: user2.id,
    });

    await message1.save();
    await message2.save();
    await message3.save();

    await user1.save();
}
