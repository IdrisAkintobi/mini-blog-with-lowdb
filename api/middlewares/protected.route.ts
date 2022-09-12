import { NextFunction, Request, Response } from 'express';
import Jwt, { JwtPayload } from 'jsonwebtoken';
import { dbData } from '../utils/db.connect.js';

export default async function protectedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    try {
      const decoded = Jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      const data = await dbData();
      const user = data.get('users').find({ id: decoded.user }).value();
      if (user) {
        res.locals.user = { user: user.id };
        next();
      } else {
        res.status(401);
        next({ message: 'Account does not exist' });
      }
    } catch (err) {
      res.status(401);
      next({ message: 'Invalid token' });
    }
  } else {
    res.status(401);
    next({ message: 'No token found' });
  }
}
