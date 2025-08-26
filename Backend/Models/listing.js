const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type : String,
        default : "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800" : v,
    },
    price: Number,
    location: String,
    country : String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;