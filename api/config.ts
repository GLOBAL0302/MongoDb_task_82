import { CorsOptions } from 'cors';
import path from 'path';

const rootPath = __dirname;

const corsWhitelist = ['https://localhost:5173'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  corsOptions,
  database: 'mongodb://localhost:5173',
};

export default config;
