const express = require('express');
const Mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});