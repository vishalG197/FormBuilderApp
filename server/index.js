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
const app =express();
const UserRouter = require("./routes/UserRoutes")
app.use(express.json());
app.use("/",UserRouter)
app.listen(8000,async()=>{
try {
   await connection ;
   console.log("connected to the database")
   console.log("server is running")
} catch (error) {
   console.log(error)
}
})