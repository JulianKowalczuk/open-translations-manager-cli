import { NextFunction, Request, Response } from 'express';

type Controller = {
  [route: string]: (req: Request, res: Response, next: NextFunction) => void;
};

export default Controller;
