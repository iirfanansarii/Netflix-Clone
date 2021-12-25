const express = require('express');
require('dotenv').config();
const corsOption = require('./config/corsoption');
const connectDB = require('./config/connection');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOption = require('./config/swagger');
// const limiter = require('./config/limiter');
const { invalidAPI } = require('./cosntants/error.message');

const port = process.env.PORT  || 5000;
const app = express();
app.use(corsOption);
app.use(express.json());
// app.use(limiter);
connectDB();

/* swagger configuration */
const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* routes */
const userRouter = require('./routes/users.route');
app.use(userRouter);

app.use("/*",(req,res)=>{
return res.status(400).json({
  message: invalidAPI,
});
})

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
