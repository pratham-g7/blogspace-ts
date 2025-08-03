import mongoose, { Schema, Document } from 'mongoose';

export interface Comment {
  id: string;
  text: string;
  author: string;
}

export interface IBlogPost extends Document {
  id: string;
  author: string;
  name: string;
  content: string;
  comments: Comment[];
}

const BlogSchema = new Schema<IBlogPost>({
  id: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  comments: [
    {
      id: String,
      text: String,
      author: String
    }
  ]
});

const Blog = mongoose.model<IBlogPost>('Blog', BlogSchema);
export default Blog;
