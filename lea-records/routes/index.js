const { Router } = require('express');
const { GetUserController, PostUserController, PutUserController } = require('../controllers/user-controller');
const { GetDiskController, PostDiskController } = require('../controllers/disk-controller');
const { GetOrderController, PostOrderController } = require('../controllers/order-controller');

const router = Router();

router.get("/users/:userId", async (req, res) => {
    const userController = new GetUserController()
    const userResponse = await userController.get(req.params.userId)
    if (userResponse.status == 200){
        return res.status(userResponse.status).json({ message:userResponse.message, item:userResponse.item});
    }
    return res.status(userResponse.status).json({ message:userResponse.message});
});

router.post('/users', async (req, res) => {
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

router.put('/users/:userId', async (req, res) => {
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

router.get("/users/:userId/orders", async (req, res) => {
    const orderController = new GetOrderController()
    const orderResponse = await orderController.getbyClient(req.params.userId)
    if (orderResponse.status == 200){
        return res.status(orderResponse.status).json({ message:orderResponse.message, orders:orderResponse.orders});
    }
    return res.status(orderResponse.status).json({ message:orderResponse.message});
});

router.get("/disks/:diskId", async (req, res) => {
    const diskController = new GetDiskController()
    const diskResponse = await diskController.get(req.params.diskId)
    if (diskResponse.status == 200){
        return res.status(diskResponse.status).json({ message:diskResponse.message, item:diskResponse.item});
    }
    return res.status(diskResponse.status).json({ message:diskResponse.message});
});

router.post('/disks', async (req, res) => {
    const { name, artist, year, genre, amount, release_date } = req.body;

    //TODO - Função externa para validações
    if (typeof name !== "string") {
        return res.status(400).json({ error: '"name" must be a string' });
    } else if (typeof artist !== "string") {
        return res.status(400).json({ error: '"artist" must be a string' });
    } else if (typeof year !== "string") {
        return res.status(400).json({ error: '"year" must be a string' });
    } else if (typeof genre !== "string") {
        return res.status(400).json({ error: '"genre" must be a string' });
    } else if (typeof amount !== "number") {
        return res.status(400).json({ error: '"amount" must be a number' });
    } else if (typeof release_date !== "string") {
        return res.status(400).json({ error: '"release_date" must be a string' }); //Tratar 
    }

    

    const postDiskController = new PostDiskController()
    const diskPostResponse = await postDiskController.post(name, artist, year, genre, amount, release_date)
    if (diskPostResponse.status == 201) {
        return res.status(diskPostResponse.status).json({ message:diskPostResponse.message, item: diskPostResponse.item});
    }
    return res.status(diskPostResponse.status).json({ message:diskPostResponse.message});
});

router.get("/orders/:orderId", async (req, res) => {
    const orderController = new GetOrderController()
    const orderResponse = await orderController.get(req.params.orderId)
    if (orderResponse.status == 200){
        return res.status(orderResponse.status).json({ message:orderResponse.message, item:orderResponse.item});
    }
    return res.status(orderResponse.status).json({ message:orderResponse.message});
});


router.post('/orders', async (req, res) => {
    const { userId, order } = req.body;

    //TODO - Função externa para validações
    if (typeof userId !== "string") {
        return res.status(400).json({ error: '"userId" must be a string' });
    } else if (typeof order !== "object") {
        return res.status(400).json({ error: `"order" must be an array with order objects like [{"diskId":"1234", "amount":10}]` });
    } 
    

    const postOrderController = new PostOrderController()
    const orderPostResponse = await postOrderController.post(userId, order)
    if (orderPostResponse.status == 201) {
        return res.status(orderPostResponse.status).json({ message:orderPostResponse.message, item: orderPostResponse.item});
    }
    return res.status(orderPostResponse.status).json({ message:orderPostResponse.message});
});

module.exports = router
