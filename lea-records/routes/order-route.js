const { Router } = require('express');
const { GetOrderController, PostOrderController } = require('../controllers/order-controller');

const orderRouter = Router();

orderRouter.get("/orders/:orderId", async (req, res) => {
    const orderController = new GetOrderController()
    const orderResponse = await orderController.get(req.params.orderId)
    if (orderResponse.status == 200){
        return res.status(orderResponse.status).json({ message:orderResponse.message, item:orderResponse.item});
    }
    return res.status(orderResponse.status).json({ message:orderResponse.message});
});


orderRouter.post('/orders', async (req, res) => {
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

module.exports = orderRouter
