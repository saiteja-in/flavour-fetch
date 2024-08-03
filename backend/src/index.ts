import express from "express";
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
  cloud_name:"dvl1fcwo2",
  api_key:"977914559279777",
  api_secret:"lI0WEcvW-IkB3teWRBEQR5B72t8"
})

app.get("/health", (req, res) => {
  res.json({ message: "healthy bitch" });
});
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant",restaurantRoute)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
