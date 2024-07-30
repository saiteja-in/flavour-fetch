import { Request, Response } from "express";
import User from "../models/user";
const createCurrentUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { auth0Id } = req.body;

    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;
    await user.save();
    res.status(200).json(user.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error updating user" });
  }
};
export default {
  createCurrentUser,
  updateCurrentUser
};