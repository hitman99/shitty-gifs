const {Storage} = require('@google-cloud/storage');

class StorageWrapper {
    constructor(local, config){
        this.config = config;
        let storageConfig = {};
        if (local === true) {
            storageConfig = { keyFilename: 'gcp-key.json'};
        }
        this.storage = new Storage(storageConfig);
    }
    async getFiles(){
        const {bucket_name} = this.config;
        try {
            const [files] = await this.storage.bucket(bucket_name).getFiles();
            return files;
        } catch (err) {
            return err;
        }
    }
}

module.exports = StorageWrapper;