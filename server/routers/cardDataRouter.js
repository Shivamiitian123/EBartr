const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// app.use(bodyParser.urlencoded({ extended: true })); // Change this to the desired port number

const url = process.env.MONGO_URL;
const dbName = "Ebartr";
const collectionName = "funkit";
// Endpoint to fetch the cards data
router.get("/cardsdata", async (req, res) => {
  try {
    const searchTerm = req.query.search; // Get the search term from the query parameter

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    let cardsData;

    if (searchTerm) {
      // If a search term is provided, retrieve the collection with that name
      const collection = db.collection(searchTerm);
      cardsData = await collection.find().toArray();
    } else {
      // If no search term is provided, retrieve all documents from a default collection
      const collection = db.collection(collectionName);
      cardsData = await collection.find().toArray();
      console.log("here u are");
    }

    client.close();
    res.json(cardsData);
  } catch (error) {
    console.error("Error fetching cards data:", error);
    res.status(500).json({ error: "Failed to retrieve cards data" });
  }
});

module.exports = router;
