/* host + /api/auth */
import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, renewToken, loginUser } from '../controllers/auth.js';

import { validateJWT } from '../middlewares/validateJWT.js';
import { validateFields } from '../middlewares/validateFields.js';

const router = Router();

router.post("/",
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is bad formatted').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password length must be 6 or more').isLength({min: 6}),
    validateFields
  ],
  loginUser
)


router.post("/new",
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is bad formatted').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password length must be 6 or more').isLength({min: 6}),
    validateFields
  ],
  createUser
)


router.get("/renew", validateJWT, renewToken)

export default router;