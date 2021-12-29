import { request, response } from 'express'
import Event from '../models/Event.js';

export const getEvents = async (req=request, res=response) => {

  const events = await Event.find()
                            .populate('user', 'name')

  return res.json({
    ok: true,
    events
  })
}

export const postEvents = async (req=request, res=response) => {
  
  const event = new Event(req.body);

  try {
    
    event.user = req.uid;

    await event.save()

    res.json({
      ok: true,
      event
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Internal Server Error'
    })
  }

}

export const updateEvents = async (req=request, res=response) => {

  const eventId = req.params.id;

  try {
    
    const event = await Event.findById(eventId);
    const uid = req.uid;

    if (!event) {
      return  res.status(404).json({
        ok: false,
        msg: 'Event not found'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You don\'t have privileges to edit this event',
      })
    }

    const newEvent = {
      ...req.body,
      user: uid,
    }

    const eventUpdated = await Event.findByIdAndUpdate(event.id, newEvent, {new: true});

    res.json({
      ok: true,
      event: eventUpdated
    })



  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Internal Server Error'
    })
  }
}

export const deleteEvents = async (req=request, res=response) => {

  const eventId = req.params.id;
  
  try {
    const event = await Event.findById(eventId);
    const uid = req.uid;

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event not found'
      })
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'You don\'t have privileges to delete this event',
      })
    }

    await Event.findByIdAndDelete(eventId)

    res.json({
      ok: true
    })

    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Internal Server Error'
    })
  }
}
