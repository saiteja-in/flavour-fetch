// import { Request, Response } from "express";
// import Restaurant from "../models/restaurant";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";

// const createMyRestaurant = async (req: Request, res: Response) => {
//     console.log("req.userId:", req.userId);
//   console.log("req.file:", req.file);
//   console.log("formdata", req.body);
//   try {
    
//     const existingRestaurant=await Restaurant.findOne({user:req.userId});
//     if(existingRestaurant){
//         return res.status(409).json({message:"user restaurant already exists"})

//     }
//     const image=req.file as Express.Multer.File;
//     const base64Image=Buffer.from(image.buffer).toString("base64");
//     const dataURI=`data:${image.mimetype};base64,${base64Image}`
//     const uploadResponse=await cloudinary.v2.uploader.upload(dataURI)

//     const restaurant=new Restaurant(req.body);
//     console.log(req.body)
//     restaurant.imageUrl=uploadResponse.url;
//     restaurant.user=new mongoose.Types.ObjectId(req.userId);
//     restaurant.lastUpdated = new Date();
//     await restaurant.save()
//     console.log("success")
//     res.status(201).send(restaurant)


//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ message: "something went wrong in myrestaurant api" });
//   }
// };

// export default {
//     createMyRestaurant,
//   };
import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";


const createMyRestaurant = async (req: Request, res: Response) => {
        console.log("req.userId:", req.userId);
  console.log("req.file:", req.file);
  console.log("formdata", req.body);
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    console.log(restaurant)
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  createMyRestaurant,
};