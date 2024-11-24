import { response } from 'express';
import User from '../model/userModel.js';

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const {email} = userData;

    const userExit = await User.findOne({email});
    //if email already exists 
    if(userExit) return res.status(400).json({message: "User already exists."});
    const saveUser = await userData.save();
    res.status(201).json(saveUser);
  }catch(err) {
    res.status(500).json({error: "Internal Server Error"})
  };
}

export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if(users.length === 0) return res.status(404).json({message: "User not found."});

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({error: "Internal Server Error"})
  };
}

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExit = await User.findById({_id: id});
    if(!userExit) return res.status(404).json({message: "User not found."});

    const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.status(201).json(updateUser);

  }catch(err) {
    res.status(500).json({error: "Internal Server Error"})
  }
}

export const deletedUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExit = await User.findById({_id: id});
    if(!userExit) return res.status(404).json({message: "User not found."});

    await User.findOneAndDelete(id)
    res.status(201).json({message: "User deleted successfully."});

  }catch(err) {
    res.status(500).json({error: "Internal Server"})
  };
}

