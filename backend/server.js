const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const applicationRoutes = require("./applicationRoutes.js");//issue generated with this earlier

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api", applicationRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
