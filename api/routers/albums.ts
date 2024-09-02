import express from 'express';
import Album from '../models/Album';
import { IAlbumMutation } from '../types';
import mongoose from 'mongoose';
import { imageUpload } from '../multer';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let albums;
    if (req.query.artist) {
      albums = await Album.find({ artist: req.query.artist }).populate('artist', 'title');
    } else {
      albums = await Album.find();
    }
    return res.send(albums);
  } catch (error) {
    next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const albums = await Album.findById(id);
    return res.send(albums);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try {
    const albumMutation: IAlbumMutation = {
      title: req.body.title,
      artist: req.body.artist,
      image: req.file ? req.file.filename : null,
      created_at: req.body.created_at,
    };
    console.log(albumMutation);

    const album = new Album(albumMutation);
    await album.save();
    return res.send(album);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default albumsRouter;
