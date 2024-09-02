import mongoose, {Types} from 'mongoose';
import Album from './Album';

const Schema = mongoose.Schema

const TrackSchema = new Schema({
  title:{
    type:String,
    required: true,
  },
  album:{
    type: Schema.Types.ObjectId,
    ref:'Album',
    required:true,
    validator:async(value:Types.ObjectId)=>{
      const album = await Album.findById(value)
      return Boolean(album);
    }
  },
  duration:{
    type:String,
  }
})