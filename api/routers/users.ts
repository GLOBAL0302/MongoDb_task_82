import express from "express";
import { UserField } from '../types';
import User from '../models/User';
import mongoose from 'mongoose';


const usersRouter = express.Router()


usersRouter.post("/", async(req, res, next)=>{
  try{
    const UserField:UserField={
      username:req.body.username,
      password:req.body.password,
    }
    const user = new User(UserField)
    await user.save();
    return res.status(200).send(user);
  }catch(error){
    if(error instanceof mongoose.Error.ValidationError){
      return res.status(400).send(error);
    }

    return next(error);
  }

})


export default usersRouter;
