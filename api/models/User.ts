import mongoose, { Types } from 'mongoose';


const Schema = mongoose.Schema


const UserSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  token:{
    type:String,
    required:true,
  }
})

UserSchema.pre('save', function(next){

  next()
});

const User = mongoose.model("User", UserSchema);
export default User