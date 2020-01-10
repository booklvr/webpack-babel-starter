import uuidv4       from 'uuid/v4';
import { Router }   from 'express';

const router = Router();


router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
    return res.send(req.context.models.messages[req.params.messageId]);
});
