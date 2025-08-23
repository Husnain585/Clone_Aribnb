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
        default : "https://unsplash.com/photos/shadows-of-two-people-making-a-heart-y1mOuOfwitg",
        set: (v) => v === "" ? "https://unsplash.com/photos/shadows-of-two-people-making-a-heart-y1mOuOfwitg" : v,
    },
    price: Number,
    location: String,
    country : String,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;