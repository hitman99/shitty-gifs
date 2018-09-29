const {Storage} = require('@google-cloud/storage');
const app = require('express')();
const get_files = async () => {

    let storage;
    if (!process.env.LOCAL) {
        storage = new Storage();
    } else {
        if (process.env.LOCAL == "true") {
            storage = new Storage({
                keyFilename: './gcp-key.json'
            });
        }
    }

    try {
        let results = await storage.bucket('shitty-gifs').getFiles();

        const files = results[0];
        return files;
    } catch (err) {
        return null;
    }
};

(async () => {
    await get_files();
})();

app.get('/', async (req, res) => {
    let gifs = await get_files();
    res.send(gifs.map(g => g.name))
});

app.listen(80, () => console.log(`Example app listening on port 80!`));


