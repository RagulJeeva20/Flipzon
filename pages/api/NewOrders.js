import { MongoClient } from 'mongodb';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://ragul123:ragul123@cluster0.cejcgxw.mongodb.net/flipzon?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('orders');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;