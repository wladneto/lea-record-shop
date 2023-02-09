const { Router } = require('express');
const { GetDiskController, PostDiskController } = require('../controllers/disk-controller');

const diskRouter = Router();

diskRouter.get("/:diskId", async (req, res) => {
    const diskController = new GetDiskController()
    const diskResponse = await diskController.get(req.params.diskId)
    if (diskResponse.status == 200){
        return res.status(diskResponse.status).json({ message:diskResponse.message, item:diskResponse.item});
    }
    return res.status(diskResponse.status).json({ message:diskResponse.message});
});

diskRouter.post('/', async (req, res) => {
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

module.exports = diskRouter
