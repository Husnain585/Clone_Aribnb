const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../Models/listing");
const Mongo_URL = "mongodb://localhost:27017/airbnb";
main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.error(err);
});
async function main() {
    mongoose.connect(Mongo_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data is inilaized");
};

initDB();