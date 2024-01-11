const chai = require('chai');
const expect = chai.expect;
const MongoClient = require('mongodb').MongoClient;

describe('Database Connection', function() {
    it('should connect to the db successfully', async function() {
        const uri = "mongodb://localhost:27017/mywebdb";
        const client = new MongoClient(uri);

        // If command works successfully then db connection has been established
        try {
            await client.connect();
            await client.db().admin().listDatabases();
            expect(client).to.be.an('object');
        } finally {
            await client.close();
        }
    });
});