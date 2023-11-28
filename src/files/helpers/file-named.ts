import { Request } from 'express';
import { v4 as uuid } from 'uuid';

export const fileNamed = (req: Request, file: Express.Multer.File, callback: Function) => {
  if(!file) return callback(new Error('File is empty'), false);

  const extention = file.mimetype.split('/').at(-1);
  const filename = `${uuid()}.${extention}`;
  callback(null, filename);
}