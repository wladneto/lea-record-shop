const { Router } = require('express');
const { GetUserController, PostUserController, PutUserController } = require('../controllers/user-controller');

const userRouter = Router();

userRouter.get("/:userId", async (req, res) => {
    const userController = new GetUserController()
    const userResponse = await userController.get(req.params.userId)
    if (userResponse.status == 200){
        return res.status(userResponse.status).json({ message:userResponse.message, item:userResponse.item});
    }
    return res.status(userResponse.status).json({ message:userResponse.message});
});

userRouter.post('/', async (req, res) => {
    const { name, doc, birthDate, email, phone } = req.body;

    //TODO - Função externa para validações
    if (typeof name !== "string") {
        return res.status(400).json({ error: '"name" must be a string' });
    } else if (typeof doc !== "string") {
        return res.status(400).json({ error: '"doc" must be a string' });
    } else if (typeof birthDate !== "string") {
        return res.status(400).json({ error: '"birthDate" must be a string' });
    } else if (typeof email !== "string") {
        return res.status(400).json({ error: '"email" must be a string' });
    } else if (typeof phone !== "string") {
        return res.status(400).json({ error: '"doc" must be a string' });
    }

    const postUserController = new PostUserController()
    const userPostResponse = await postUserController.post(name, doc, birthDate, email, phone)
    if (userPostResponse.status == 201) {
        return res.status(userPostResponse.status).json({ message:userPostResponse.message, item: userPostResponse.item});
    }
    return res.status(userPostResponse.status).json({ message:userPostResponse.message});
});

userRouter.put('/:userId', async (req, res) => {
    const { name, doc, birthDate, email, phone, active  } = req.body;

    //TODO - Função externa para validações
    if (typeof name !== "string") {
        return res.status(400).json({ error: '"name" must be a string' });
    } else if (typeof doc !== "string") {
        return res.status(400).json({ error: '"doc" must be a string' });
    } else if (typeof birthDate !== "string") {
        return res.status(400).json({ error: '"birthDate" must be a string' });
    } else if (typeof email !== "string") {
        return res.status(400).json({ error: '"email" must be a string' });
    } else if (typeof phone !== "string") {
        return res.status(400).json({ error: '"doc" must be a string' });
    } else if (typeof active !== "boolean") {
        return res.status(400).json({ error: '"active" must be a boolean' });
    }

    const putUserController = new PutUserController()
    const userPutResponse = await putUserController.put(req.params.userId, name, doc, birthDate, email, phone, active)
    if (userPutResponse.status == 200) {
        return res.status(userPutResponse.status).json({ message:userPutResponse.message, item: userPutResponse.item});
    }
    return res.status(userPutResponse.status).json({ message:userPutResponse.message});
});

userRouter.get("/:userId/orders", async (req, res) => {
    const orderController = new GetOrderController()
    const orderResponse = await orderController.getbyClient(req.params.userId)
    if (orderResponse.status == 200){
        return res.status(orderResponse.status).json({ message:orderResponse.message, orders:orderResponse.orders});
    }
    return res.status(orderResponse.status).json({ message:orderResponse.message});
});



module.exports = userRouter
