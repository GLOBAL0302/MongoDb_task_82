import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [LinkinPark, ImagineDragons, Skillet] = await Artist.create(
    {
      title: 'LinkinPark Artists',
      image: 'fixtures/linkinPark.jpeg',
      description: 'RockBand',
    },
    {
      title: 'ImagineDragons Artists',
      image: 'fixtures/imagineDragons.webp',
      description: 'RockBand',
    },
    {
      title: 'Skillet Artists',
      image: 'fixtures/SkilletBand.webp',
      description: 'RockBand',
    },
  );

  const [linkinAlbum, imagineDragonsAlbum, skilletAlbum] = await Album.create(
    {
      title: 'LinkinPark Album',
      artist: LinkinPark,
      created_at: '2020/02/15',
      image: 'fixtures/linkinPark.jpeg',
    },
    {
      title: 'Imagine Dragons Album',
      artist: ImagineDragons,
      created_at: '2015/02/15',
      image: 'fixtures/imagineDragons.webp',
    },
    {
      title: 'Skillet Band Album',
      artist: Skillet,
      created_at: '2015/02/15',
      image: 'fixtures/SkilletBand.webp',
    },
  );

  await Track.create(
    {
      title: 'LinkinPark Track',
      album: LinkinPark,
      duration: '3:15',
    },
    {
      title: 'ImagineDragons Track',
      album: imagineDragonsAlbum,
      duration: '5:15',
    },
    {
      title: 'Skillet Track',
      album: skilletAlbum,
      duration: '34:15',
    },
  );

  await db.close();
};

run().catch(console.error);
