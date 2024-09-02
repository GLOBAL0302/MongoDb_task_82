import cors from 'cors';
import express from 'express';
import config from './config';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';

const app = express();
app.use(express.json());
app.use(cors(config.corsOptions));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
