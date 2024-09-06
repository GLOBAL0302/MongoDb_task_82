import express from 'express';
import mongoose from 'mongoose';

import User from '../models/User';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';

const trackHistoryRouter = express.Router();


trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');
    if (!headerValue) {
      return res.status(401).send({ error: 'Unauthorized' });
    }
    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }



    const user = await User.findOne({token});

    if(!user){
      return res.status(401).send({ error: 'Wrong Token' });
    }

    const {track} = req.body

    if(!track){
      return res.status(401).send({ error: 'required ID' });
    }

    if(!mongoose.Types.ObjectId.isValid(track)){
      return res.status(401).send({ error: 'Invalid Track ID' });
    }

    const track_id = await Track.findById(track);

    if(!track_id){
      return res.status(401).send({ error: 'Invalid Track ID' });
    }


      const trackHistoryMutation = {
        track: req.body.track,
        user_id: user._id,
        created_at: new Date()
    }

      const trackHistory = new TrackHistory(trackHistoryMutation);
      await trackHistory.save();

      res.send(trackHistory)

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({});
    }
    next(error)
  }
});


export default trackHistoryRouter;