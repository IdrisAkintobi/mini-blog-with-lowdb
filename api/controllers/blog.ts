import { NextFunction, Request, Response } from 'express';
import crypto from 'node:crypto';
import Validate from '../utils/data.validator.js';
import db, { dbData } from '../utils/db.connect.js';

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: author } = res.locals.user;
    const { title, content, isPublished, comments } = Validate.blogPost.parse({
      ...req.body,
      author,
    });
    const data = await dbData();
    const blog = data.get('blogs').find({ title, author }).value();
    if (blog) {
      res.status(400).json({ message: 'Blog already exists' });
    } else {
      const id = crypto.randomUUID();
      db.data?.blogs.push({
        id,
        title,
        content,
        isPublished,
        author,
        comments,
      });
      await db.write();
      res.json({ message: 'Blog posted successfully' });
    }
  } catch (error: any) {
    next(error);
  }
};
// Get blog controller
const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await dbData();
    const blogs = data.get('blogs').filter({ isPublished: true }).value();
    if (!blogs.length) {
      res.status(404).json({ message: 'No blogs found' });
    } else res.json({ blogs });
  } catch (error) {
    next(error);
  }
};
// Comment controller
const commentBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, blogId } = Validate.blogComment.parse({
      ...req.body,
      ...req.params,
    });
    const { user } = res.locals.user;
    const data = await dbData();
    const blog = data.get('blogs').find({ id: blogId }).value();
    if (blog) {
      const id = blog.comments ? blog.comments.length + 1 : 1;
      blog.comments?.push({ id, user, content });
      await db.write();
      res.json({ message: 'Comment posted successfully' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
};
// Publish blog controller
const publishBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: author } = res.locals.user;
    const { blogId: id } = Validate.publishBlog.parse(req.params);
    const data = await dbData();
    const blog = data.get('blogs').find({ id, author }).value();
    if (blog) {
      if (blog.isPublished) throw new Error('Blog already published');
      blog.isPublished = true;
      db.write();
      res.json({ message: 'Blog published successfully' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    next(error);
  }
};
// Get user blog
const getUserBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user: author } = res.locals.user;
    const data = await dbData();
    const blogs = data.get('blogs').filter({ author }).value();
    if (!blogs.length) {
      res.status(404).json({ message: 'No blogs found' });
    } else res.json({ blogs });
  } catch (error) {
    next(error);
  }
};
export default {
  createBlog,
  getBlogs,
  commentBlog,
  publishBlog,
  getUserBlogs,
};
