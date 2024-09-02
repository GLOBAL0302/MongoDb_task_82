import express from 'express';
import Artist from '../models/Artist';
import { imageUpload } from '../multer';
import mongoose from 'mongoose';
import { IArtistMutation } from '../types';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (err) {
    next(err);
  }
});

artistsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try {
    const artistMutation: IArtistMutation = {
      title: req.body.title,
      image: req.file ? req.file.filename : null,
      description: req.body.description,
    };

    const artist = new Artist(artistMutation);
    await artist.save();
    return res.send(artist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default artistsRouter;
