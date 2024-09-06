import express from 'express';
import mongoose from 'mongoose';

import { ITrackHistory } from '../types';
import User from '../models/User';
import TrackHistory from '../models/TrackHistory';

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
    if(user) {
      const trackHistoryMutation: ITrackHistory = {
        track: req.body.track,
        user: user.username,
        created_at: new Date(),
      };

      const trackHistory = new TrackHistory(trackHistoryMutation);
      await trackHistory.save();

      res.send(trackHistory);
    }

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({});
    }
    next(error)
  }
});


export default trackHistoryRouter;