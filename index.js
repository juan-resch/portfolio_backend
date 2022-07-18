require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/Routes");

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
