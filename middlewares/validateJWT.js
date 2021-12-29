import { response, request } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (req=request, res=response, next) => {

  // x-token in Headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token invalid'
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JTW_SEED);

    req.uid = uid;
    req.name = name;

  } catch (err) {
    return res.status(401).json({
      ok: false,
      msg: 'Token invalid'
    })
  }
  

  next();

}