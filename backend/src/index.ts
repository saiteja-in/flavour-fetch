import express from 'express';
import cors from 'cors';
import "dotenv/config"
const app = express();
app.use(express.json())
app.use(cors());
app.get("/test",async(req,res)=>{
    res.json({message:"Hello world"})
})
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 7000")  // server is running on port 7000
})