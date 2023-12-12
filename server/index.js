// //simple in http

// const http = require('http');

// const server = http.createServer((req,res)=>{
//    res.setHeader({'Content-type':"text/plain"})
//    res.end("Hello welcome to the server")
// })

// server.listen(3000,()=>{
//    console.log("server is running")
// })

const express = require("express")
const connection =require("./db")
const cors = require('cors');
const formRoutes = require('./routes/forms');
const responsesRouter = require('./routes/responses'); 

const app =express();

app.use(cors());
app.use(express.json());
app.use('/forms', formRoutes);
app.use('/responses', responsesRouter);
app.listen(8000,async()=>{
try {
   await connection ;
   console.log("connected to the database")
   console.log("server is running")
} catch (error) {
   console.log(error)
}
})