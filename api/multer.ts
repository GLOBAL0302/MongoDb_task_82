import multer from 'multer';
import path from 'node:path';
import config from './config';
import  {promises as fs} from 'fs';
import {randomUUID} from 'node:crypto';


const imageStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destDir = path.join(config.publicPath, "image");
    await fs.mkdir(destDir, {recursive: true});
    cb(null, config.publicPath);
  },
  filename:(req,file, cb)=>{
    const extension = path.extname(file.originalname)
    const newFileName = randomUUID() + extension;
    cb(null, "images/" + newFileName);
  }
})

export const imageUpload = multer({storage:imageStorage})