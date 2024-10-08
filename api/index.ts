import cors from 'cors';
import express from 'express';
import config from './config';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';
import mongoose from 'mongoose';
import usersRouter from './routers/users';
import trackHistoryRouter from './routers/trackHistory';

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors(config.corsOptions));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};
run().catch(console.error);
