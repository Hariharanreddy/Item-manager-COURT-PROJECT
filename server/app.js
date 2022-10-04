const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const books = require("./models/bookSchema");
const cors = require("cors");
const router = require("./routes/router");  

const port = process.env.PORT || 8000;  

app.use(cors());
app.use(express.json());

// app.get("/",(req,res)=>{
//     res.json("server start")
// })

app.use(router);

app.listen(port, () => {
    console.log(`server is started at port number ${port}`);
});