const { MongoClient, ServerApiVersion } = require('mongodb');
const {mongoose} = require('mongoose')
require('dotenv').config();
const {URI} = process.env
// const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object

//   client.close();

//});
const uriHardCoded = "mongodb+srv://JGuazzini:pedroangel02@cluster0.y36ey.mongodb.net/?retryWrites=true&w=majority"
mongoose
  .connect(uriHardCoded, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log("connected to mongodbAtlas"))
  .catch(err => console.log(err))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () =>
  console.log("Connected successfully")
);

module.exports = db
