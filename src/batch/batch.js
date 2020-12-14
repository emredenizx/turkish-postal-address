const { batchWriteDistricts, batchWriteProvinces, batchWriteLocalities, initializeDb } = require("./utils.js");
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const path = require('path');
const fs = require('fs');

const config = {
    apiKey: "<apiKey>",
    authDomain: "<authDomain>",
    projectId: "<projectId>",
    storageBucket: "<storageBucket>",
    messagingSenderId: "<messagingSenderId>",
    appId: "<appId>"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
const db = firebase.firestore();

const writeDocuments = async (filesPath, batchFn) => {
    const dir = path.resolve(__dirname, `./${filesPath}`);
    const files = fs.readdirSync(dir);

    for (let file of files) {
        let data = fs.readFileSync(path.resolve(__dirname, `./${filesPath}/${file}`));
        const documents = JSON.parse(data);
        await batchFn(documents, db, file);        
    }  
}

(async () => {
    await initializeDb(db);
    await writeDocuments('provinces', batchWriteProvinces);
    await writeDocuments('districts', batchWriteDistricts); 
    await writeDocuments('localities', batchWriteLocalities);
        firebase.app().delete(); 
        console.log('ALL BATCHES COMPLETE! ✅');
})()
