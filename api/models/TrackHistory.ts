import mongoose, { Types } from 'mongoose';
import User from './User';
import Track from './Track';

const Schema = mongoose.Schema

const TrackHistorySchema = new Schema({
  user:{
    type:Schema.Types.String,
    ref:"User",
    required:true,
    validator:async(value:Types.ObjectId)=>{
      const user = await User.find(value)
      return Boolean(user)
    },
    message: "User not found",
  },
  track:{
    type:Schema.Types.ObjectId,
    ref:"Track",
    required:true,
    validator:async(value:Types.ObjectId)=>{
      const track = await Track.find(value);
      return Boolean(track);
    },
    message: "Track not found"
  },
  created_at:{
    type:Date,
    required:true,
  }
})

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;

