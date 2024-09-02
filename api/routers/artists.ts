import express from 'express';
import Artist from '../models/Artist';


const artistsRouter = express.Router();

artistsRouter.get('/', async(req, res, next)=>{
  try{
    const artists = await Artist.find();
    return res.send(artists);
  }catch(err){
    next(err)
  }
})