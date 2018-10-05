const app = require('express')();
const Storage = require('./cloud-storage');
const config = require('./config');
const gcs = new Storage(!!process.env.LOCAL, config);

app.get('/healthz', (req, res) => {
    res.send('OK');
});
app.get('/', async (req, res) => {
    let gifs = await gcs.getFiles();
    if (!(gifs instanceof Error)) {
        res.send(gifs.map(g => g.name));
    } else {
        res.send('Could not get list of files from cloud')
    }

});

app.listen(80, () => console.log(`Server is listening on port 80`));


