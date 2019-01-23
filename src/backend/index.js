const express = require('express');
const app = express();
const Storage = require('./cloud-storage');
const config = require('./config');
const gcs = new Storage(!!process.env.LOCAL, config);
const path = require('path');

app.use(express.static(path.resolve(__dirname, '..', '../dist/')));


app.get('/healthz', (req, res) => {
    res.send('OK');
});

app.get('/api/get-images', async (req, res) => {
    let gifs = await gcs.getFiles();
    if (!(gifs instanceof Error)) {
        res.send(gifs.map(g => g.name));
    } else {
        res.send('Could not get list of files from cloud')
    }

});
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '..', '../dist/index.html'));
});
app.listen(80, () => console.log(`Server is listening on port 80`));