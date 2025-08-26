// =======================
// Required Modules
// =======================
const express = require("express");
const Mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const { render } = require("ejs");
const methodOverride = require("method-override");

// =======================
// App Configuration
// =======================
const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// Database Configuration
// =======================
const Listing = require("./Models/listing");
const Mongoose_URL = "mongodb://localhost:27017/airbnb";

async function main() {
  await Mongoose.connect(Mongoose_URL);
}

main()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// =======================
// Middlewares
// =======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// =======================
// Routes
// =======================

// Index Route
app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Internal Server Error");
  }
});

// New Route
app.get("/listing/new", (req, res) => {
  res.render("listings/new");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/show", { listing });
  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Create Route
app.post("/listings", async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  } catch (error) {
    next(error);
  }
});

// Edit Route
app.get("/listing/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });
  res.redirect(`/listings/${updatedListing._id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


// =======================
// Server Listener
// =======================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// =======================
