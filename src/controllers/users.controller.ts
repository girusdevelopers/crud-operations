import User from "@/models/model";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const secretKey = "secretkey";
import crypto from "crypto";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.params.user_id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletebyId = async(req,res) => {
  try{
      const {id} = req.params;
      const user = await User.deleteOne({_id: id});
      res.status(200).json("User deleted successfully");
  }catch(error){
      res.status(500).json("error")
  }
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { firstname, lastname, email, password} = req.body;
  // const mail=email.toLowerCase()
  // console.log(mail)
  // const validRoles = ['user', 'admin', 'artist', 'company','super-admin'];
  // const selectedRole = validRoles.includes(role) ? role : 'user';
  if (!firstname || !lastname || !email || !password ) {
    return res.status(400).json("All fields are required");
  }
    try {
      const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        
      });
      res.status(200).json("success");
    } catch (error) {
      res.status(500).json(error);
    }
  }


export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  // const mail=email.toLowerCase()
  if (!email || !password) {
    return next(new Error("Email and password Required "));
  }
 

  const user = await User.findOne({ email }).select("+password");
  console.log({ user });
  if (!user) {
    return next(new Error("Email and password not matched "));
  }
  const isCorrectPassword = await user.checkValidPassword(password);
  if (!isCorrectPassword) {
    return next(new Error("Incorrect Password"));
  } else {
    const token = jwt.sign({ user }, secretKey);
    res.status(200).json({  user });

    // const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    // res.status(200).json("success")
  }
};


export const updatedetails = async(req,res) => {
  try{
    const { firstname,lastname} = req.body;
    const updateUser = await User.findByIdAndUpdate({_id : req.params.userId},{$set:{firstname,lastname}},{new:true})
    res.status(200).json(updateUser)

  }catch(error){
    res.status(500).json("error")
  }
}




export const forgotPassword = async (req: Request, res: Response) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("Unable to find email");
    }

    // Generate and save a reset token (assuming you have this method on your User model)
    const token = user.createResetpasswordToken();

    // Save the user with the new token
    await user.save({ validateBeforeSave: false });

    // You can return a success message or other response as needed
    return res
      .status(200)
      .json({ token, message: "Reset token created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

export const resetPassword = async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ resetPasswordToken: req.body.token });
  console.log(user);
  user.password = req.body.password;
  user.confirm_password = req.body.password;
  user.save();
  res.send(user);
};
