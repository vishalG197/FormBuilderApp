// index.js

const express = require("express");
const connection = require("./db");
const cors = require('cors');
const formRoutes = require('./routes/form');
const responsesRouter = require('./routes/response');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/forms', formRoutes);
app.use('/responses', responsesRouter);
app.get("/",(req,res)=>{
  console.log("server is running")
  res.send("server is running")
})
app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to the database");
    console.log("Server is running on port http://localhost:8000");
  } catch (error) {
    console.error(error);
  }
});
