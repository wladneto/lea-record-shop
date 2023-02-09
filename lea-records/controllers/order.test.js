const { GetOrderController, PostOrderController } = require('./order-controller');
const { uuid } = require('uuidv4');

const getOrderController = new GetOrderController()
const postOrderController = new PostOrderController()


const userId = uuid()

const testOrder =  {
    userId: userId,
    order:[
        {
            diskId:uuid(), 
            amount:1
        },
        {
            diskId:uuid(), 
            amount:1
        }

    ]
}

const testAnotherOrder =  {
    userId: userId,
    order:[
        {
            diskId:uuid(), 
            amount:2
        },
        {
            diskId:uuid(), 
            amount:2
        }

    ]
}

let newOrderId = ''

describe('recover order that is not in dynamo', () => {
    it('should retrive 404 ', async () => {
        const data = await getOrderController.get('1234567890')
        expect(data).toBeDefined()
        expect(data.status).toBe(404)
        expect(data.message).toBe("could not find order with provided orderId")
    })
})

describe('create new order in dynamo', () => {
    it('should retrive 201', async () => {
        const data = await postOrderController.post(
            testOrder.userId,
            testOrder.order
        )
        expect(data).toBeDefined()
        expect(data.status).toBe(201)
        expect(data.message).toBe("order created")
        expect(data.item.userId).toBe(testOrder.userId)
        expect(data.item.order[0].diskId).toBe(testOrder.order[0].diskId)
        expect(data.item.order[0].amount).toBe(testOrder.order[0].amount)
        expect(data.item.order[1].diskId).toBe(testOrder.order[1].diskId)
        expect(data.item.order[1].amount).toBe(testOrder.order[1].amount)
   

        newOrderId = data.item.orderId
    })
})

describe('create another new order in dynamo', () => {
    it('should retrive 201', async () => {
        const data = await postOrderController.post(
            testAnotherOrder.userId,
            testAnotherOrder.order
        )
        expect(data).toBeDefined()
        expect(data.status).toBe(201)
        expect(data.message).toBe("order created")
        expect(data.item.userId).toBe(testOrder.userId)
        expect(data.item.order[0].diskId).toBe(testAnotherOrder.order[0].diskId)
        expect(data.item.order[0].amount).toBe(testAnotherOrder.order[0].amount)
        expect(data.item.order[1].diskId).toBe(testAnotherOrder.order[1].diskId)
        expect(data.item.order[1].amount).toBe(testAnotherOrder.order[1].amount)
    })
})

describe('recover order that is in dynamo', () => {
    it('should retrive 200', async () => {
        const data = await getOrderController.get(newOrderId)
        expect(data).toBeDefined()
        expect(data.status).toBe(200)
        expect(data.message).toBe("order retreived")
        expect(data.item.userId).toBe(testOrder.userId)
        expect(data.item.order[0].diskId).toBe(testOrder.order[0].diskId)
        expect(data.item.order[0].amount).toBe(testOrder.order[0].amount)
        expect(data.item.order[1].diskId).toBe(testOrder.order[1].diskId)
        expect(data.item.order[1].amount).toBe(testOrder.order[1].amount)

    })
})

describe('recover user orders in dynamo', () => {
    it('should retrive 200', async () => {
        const data = await getOrderController.getbyClient(testOrder.userId)
        expect(data).toBeDefined()
        expect(data.status).toBe(200)
        expect(data.message).toBe("orders retreived")
        expect(data.orders[0].userId).toBe(testOrder.userId)
        expect(data.orders[1].userId).toBe(testOrder.userId)
    })
})