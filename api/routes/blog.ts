import { Router } from 'express';
import Blog from '../controllers/blog.js';
import protectedRoute from '../middlewares/protected.route.js';

const router = Router();

router.post('/create', protectedRoute, Blog.createBlog);
router.get('/view', Blog.getBlogs);
router.post('/comment/:blogId', protectedRoute, Blog.commentBlog);
router.post('/publish/:blogId', protectedRoute, Blog.publishBlog);
router.get('/view/my-blogs', protectedRoute, Blog.getUserBlogs);

export default router;
