const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://ArmaFall:80msln02L@esp32web.z6xixsl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function createCollection() {
    try {
        await client.connect();
        const database = client.db("test");
        const collection = database.collection("Test");
        const result = await collection.insertOne({ "oui": 3 });
        console.log(`${result.insertedCount} documents were inserted into the collection.`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = async (req, res) => {
    try {
      await createCollection();
      res.status(200).send('Collection créée avec succès !');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la création de la collection !');
    }
  };
  
