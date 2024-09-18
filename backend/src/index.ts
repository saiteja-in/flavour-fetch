import express, { Request, Response } from "express";
import path from "path"
import { v2 as cloudinary } from 'cloudinary'
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
cloudinary.config({
  cloud_name:process.env.CLOUDINAY_CLOUD_NAME,
  api_key:process.env.CLOUDINAY_API_KEY,
  api_secret:process.env.CLOUDINAY_API_SECRET
})

app.get("/health", async(req:Request, res:Response) => {
  res.json({ message: "healthy" });
});
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant",restaurantRoute)

const frontendPath = path.join(__dirname, "../../frontend/dist"); // Adjust the path to point to the frontend folder

app.use(express.static(frontendPath));

// Fallback to send index.html for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"));
});


// app.use(express.static(path.join(__dirname,"/frontend/dist")))
// app.use("*",(req,res)=>{
//   res.sendFile(path.join(__dirname,'frontend','dist','index.html'))
// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
