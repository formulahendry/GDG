const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dummyjson = require('dummy-json');

async function genData(count, collectionName) {
    // Connection URL
    const url = 'mongodb://*****';

    // Database Name
    const dbName = 'test';

    // Use connect method to connect to the server
    const client = await MongoClient.connect(url);
    console.log("Connected successfully to server");
    const db = client.db(dbName);

    const collection = db.collection(collectionName);
    const template = fs.readFileSync(`./data/${collectionName}.hbs`, {encoding: 'utf8'});
    for (let i = 0; i < count; i++) {
        const result = dummyjson.parse(template);
        await collection.insertOne(JSON.parse(result));
        console.log("Iteration #"+i);
        console.log(JSON.parse(result));
    }

    client.close();
}

genData(4, "activity");


