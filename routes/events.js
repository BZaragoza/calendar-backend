import { Router } from "express";
import { check } from 'express-validator';

import { validateJWT } from '../middlewares/validateJWT.js';
import { validateFields } from '../middlewares/validateFields.js';

import { isDate } from '../helpers/isDate.js';

import { getEvents, postEvents, updateEvents, deleteEvents } from '../controllers/events.js'

const router = Router();

router.get('/', getEvents);


router.post('/', 
  [
    validateJWT,
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validateFields,
  ],
  postEvents
);

router.put('/:id', 
  [
    validateJWT,
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validateFields,
  ],
  updateEvents
);
router.delete('/:id', validateJWT, deleteEvents);

export default router;