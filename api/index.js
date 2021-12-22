const express = require('express');
require('dotenv').config();
const corsOption = require('./config/corsoption');

const app = express();
app.use(corsOption);
app.use(express.json());

const port = process.env.PORT;
console.log('port is', port);

app.listen(port, () => {
  console.log(`server is listening on port`);
});
