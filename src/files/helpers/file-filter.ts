import { Request } from "express";

export const fileFilter = (req: Request, file: Express.Multer.File, callback: Function) => {
  if(!file) return callback(new Error('File is empty'), false);

  const extention = file.mimetype.split('/').at(-1);
  const allowExtentions = ['jpg', 'jpeg', 'png'];

  if(allowExtentions.includes(extention)) {
    return callback(null, true)
  }
  callback(null, false);
}