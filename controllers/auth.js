import { request, response } from 'express';
import bcrypt from 'bcrypt'

import User from '../models/User.js'
import { generateJWT } from '../helpers/jwt.js';

export const createUser = async (req=request, res=response) => {

  const {email, password} = req.body;

  try {

    let user = await User.findOne({email})

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email is already in use'
      })
    }

    user = new User(req.body);

    // Password encryption
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Internal Server Error'
    })
  }
}

export const loginUser = async (req=request, res=response) => {

  const {email, password} = req.body

  try {

    const user = await User.findOne({email});

    if (!user) {
      return res.json({
        ok: false,
        msg: 'Email or password are incorrect'
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Email or password are incorrect'
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })

    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Internal Server Error'
    })
  }
}

export const renewToken = async (req=request, res=response) => {

  const {name, uid} = req;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  })
}