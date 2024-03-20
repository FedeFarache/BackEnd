
const express = require("express");
const app = express();
const http = require("http").createServer (app);
require('dotenv').config();
const PORT = process.env.PORT || 8050;

app.get("/",(req,res) => {
    res.send("hola mundo.")
})

app.post("/",(req,res) => {
    res.send("llamada post.")
})

http.listen(PORT,()=>{
    console.log(`server corriendo ${PORT}`)
})
