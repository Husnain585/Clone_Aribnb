const express = require('express');
const Mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;
const Listing = require("./Models/listing");
const Mongoose_URL = "mongodb://localhost:27017/airbnb";

async function main() {
    await Mongoose.connect(Mongoose_URL);
}
main()
    .then(() => {
        console.log("Database connection established");
    })
    .catch(err => {
        console.error("Database connection error:", err);
    });

app.get("/testlisting", async (req, res) => {
  let sampleListing = new Listing({
    title: "My home",
    description: "Finest property",
    price: 202382,
    location: "kasur",
    country: "pakistan",
  });
  await sampleListing.save();
  console.log("sample was save");
  res.send("successfull")
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});