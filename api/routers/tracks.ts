import express from 'express';
import Track from '../models/Track';
import { ITrackMutations } from '../types';
import mongoose from 'mongoose';
import { imageUpload } from '../multer';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let tracks;
    if (req.query.album) {
      tracks = await Track.find({ album: req.query.album }).populate('album', 'title');
    } else {
      tracks = await Track.find();
    }
    return res.send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try {
    const trackMutations: ITrackMutations = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
    };

    const track = new Track(trackMutations);
    await track.save();
    res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default tracksRouter;
