import z from 'zod';

const user = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const blogPost = z.object({
  title: z.string().min(6),
  content: z.string().min(12),
  isPublished: z.boolean().default(false),
  author: z.string().uuid(),
  comments: z
    .array(
      z.object({
        id: z.number(),
        user: z.string().uuid(),
        content: z.string().min(12),
      })
    )
    .default([]),
});
const blogComment = z.object({
  blogId: z.string().uuid(),
  content: z.string().min(12),
});
const publishBlog = z.object({
  blogId: z.string().uuid(),
});
export default {
  user,
  blogPost,
  blogComment,
  publishBlog,
};
