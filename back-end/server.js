const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require('./routes/api');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/server', api);

app.get("/", (req, res) => {
  res.json({ message: "App server with nodemon" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
