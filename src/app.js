const express = require('express');
require('dotenv').config();
const corsOption = require('./config/corsoption');
const connectDB = require('./config/connection');


const port = process.env.PORT;
const app = express();
app.use(corsOption);
app.use(express.json());
connectDB();



app.get("/hello",(req,res)=>{
  return res.send("Hello Darling")
})

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
