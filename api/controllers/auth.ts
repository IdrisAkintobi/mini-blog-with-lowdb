import argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import Validate from '../utils/data.validator.js';
import db, { dbData } from '../utils/db.connect.js';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = Validate.user.parse(req.body);
    const data = await dbData();
    const user = data.get('users').find({ email }).value();
    if (!user) return res.status(400).json({ message: 'Login failed' });
    const passwordMatched = await argon2.verify(user.password, password);
    if (passwordMatched) {
      res.json({
        message: 'Login successful',
        token: Jwt.sign({ user: user.id }, process.env.JWT_SECRET as string),
      });
    } else {
      res.status(400).json({ message: 'Login failed' });
    }
  } catch (error) {
    next(error);
  }
};
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = Validate.user.parse(req.body);
    const data = await dbData();
    const user = data.get('users').find({ email }).value();
    if (user) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      try {
        const id = crypto.randomUUID();
        db.data?.users.push({
          id,
          email,
          password: await argon2.hash(password),
        });
        await db.write();
        res.json({ message: 'Registration successful' });
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

export default { login, register };
