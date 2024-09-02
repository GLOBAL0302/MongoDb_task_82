import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;
