const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pass = "EmiratesPalace007";

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://emirates:EmiratesPalace007@cluster0.zrfamgw.mongodb.net/emiratesPalaceUae?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const bookings = client.db("emiratesPalaceUae").collection("bookings");

  app.post("/addBooking", (req, res) => {
    const newBooking = req.body;
    bookings.insertOne(newBooking).then((result) => {
      res.send(result.insertedCount > 0);
    });
    console.log(newBooking);
  });

  app.get("/bookings", (req, res) => {
    // console.log(req.query.email);
    bookings.find({email:req.query.email}).toArray((err, documents) => {
      res.send(documents);
    });
  });
});

app.listen(port);
