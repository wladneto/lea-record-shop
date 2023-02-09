const { GetUserController, PostUserController, PutUserController } = require('./user-controller');

const getUserController = new GetUserController()
const postUserController = new PostUserController()
const putUserController = new PutUserController()

const testUser =  {
    name: "Test User da Silva",
    doc: "118.301.137-01",
    birthDate: "27-12-1999",
    email: "test-user@hotmail.com",
    phone: "+5534996659805",
}

let newUserId = ''

describe('recover user that is not in dynamo', () => {
    it('should retrive 404 ', async () => {
        const data = await getUserController.get('1234567890')
        expect(data).toBeDefined()
        expect(data.status).toBe(404)
        expect(data.message).toBe("could not find user with provided userId")
    })
})

describe('create new user in dynamo', () => {
    it('should retrive 201', async () => {
        const data = await postUserController.post(
            testUser.name,
            testUser.doc,
            testUser.birthDate,
            testUser.email,
            testUser.phone
        )
        expect(data).toBeDefined()
        expect(data.status).toBe(201)
        expect(data.message).toBe("user created")
        expect(data.item.name).toBe(testUser.name)
        expect(data.item.doc).toBe(testUser.doc)
        expect(data.item.birthDate).toBe(testUser.birthDate)
        expect(data.item.email).toBe(testUser.email)
        expect(data.item.phone).toBe(testUser.phone)    

        newUserId = data.item.userId
    })
})

describe('recover user that is in dynamo', () => {
    it('should retrive 200', async () => {
        const data = await getUserController.get(newUserId)
        expect(data).toBeDefined()
        expect(data.status).toBe(200)
        expect(data.message).toBe("user retreived")
        expect(data.item.name).toBe(testUser.name)
        expect(data.item.doc).toBe(testUser.doc)
        expect(data.item.birthDate).toBe(testUser.birthDate)
        expect(data.item.email).toBe(testUser.email)
        expect(data.item.phone).toBe(testUser.phone) 

    })
})

describe('update user in dynamo', () => {
    it('should retrive 200', async () => {
        const data = await putUserController.put(
            newUserId,
            `Update ${testUser.name}`,
            testUser.doc,
            testUser.birthDate,
            testUser.email,
            testUser.phone,
            false
        )
        expect(data).toBeDefined()
        expect(data.status).toBe(200)
        expect(data.message).toBe("user updated")
        expect(data.item.userId).toBe(newUserId)
        expect(data.item.name).toBe(`Update ${testUser.name}`)
        expect(data.item.doc).toBe(testUser.doc)
        expect(data.item.birthDate).toBe(testUser.birthDate)
        expect(data.item.email).toBe(testUser.email)
        expect(data.item.phone).toBe(testUser.phone)

        newUserId = data.item.userId
    })
})
