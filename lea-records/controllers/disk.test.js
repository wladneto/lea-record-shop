const { GetDiskController, PostDiskController } = require('./disk-controller');

const getDiskController = new GetDiskController()
const postDiskController = new PostDiskController()

const testDisk =  {
    name: "The best of ACDC",
    artist: "ACDC",
    year: "1999",
    genre: "rock",
    amount: 1000000,
    release_date:"27-12-2023"
}

let newDiskId = ''

describe('recover disk that is not in dynamo', () => {
    it('should retrive 404 ', async () => {
        const data = await getDiskController.get('1234567890')
        expect(data).toBeDefined()
        expect(data.status).toBe(404)
        expect(data.message).toBe("could not find disk with provided diskId")
    })
})

describe('create new disk in dynamo', () => {
    it('should retrive 201', async () => {
        const data = await postDiskController.post(
            testDisk.name,
            testDisk.artist,
            testDisk.year,
            testDisk.genre,
            testDisk.amount,
            testDisk.release_date
        )
        expect(data).toBeDefined()
        expect(data.status).toBe(201)
        expect(data.message).toBe("disk created")
        expect(data.item.name).toBe(testDisk.name)
        expect(data.item.artist).toBe(testDisk.artist)
        expect(data.item.year).toBe(testDisk.year)
        expect(data.item.genre).toBe(testDisk.genre)
        expect(data.item.amount).toBe(testDisk.amount)
        expect(data.item.release_date).toBe(testDisk.release_date)    

        newDiskId = data.item.diskId
    })
})

describe('recover disk that is in dynamo', () => {
    it('should retrive 200', async () => {
        const data = await getDiskController.get(newDiskId)
        expect(data).toBeDefined()
        expect(data.status).toBe(200)
        expect(data.message).toBe("disk retreived")
        expect(data.item.name).toBe(testDisk.name)
        expect(data.item.artist).toBe(testDisk.artist)
        expect(data.item.year).toBe(testDisk.year)
        expect(data.item.genre).toBe(testDisk.genre)
        expect(data.item.amount).toBe(testDisk.amount)
        expect(data.item.release_date).toBe(testDisk.release_date)

    })
})

