import express from "express";
import type { Request, Response } from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";
import Blog from "./db/schema.js";
import type { IBlogPost } from "./db/schema.js";
import dotenv from "dotenv";
import {Types} from "mongoose"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.render("index.ejs", { postList: null });
});

app.get("/posts", async (req: Request, res: Response) => {
  const posts: IBlogPost[] = await Blog.find();
  res.render("index.ejs", { postList: posts, showDel: false, showForm: true });
});

app.get("/about", (req: Request, res: Response) => {
  res.render("index.ejs", { postList: null });
});

app.post("/posts/:id/comment", async (req: Request, res: Response) => {
  const commentId = Math.random().toString(36).substr(2, 9);
  await Blog.findOneAndUpdate(
    { id: req.params.id },
    {
      $push: {
        comments: {
          id: commentId,
          text: req.body.comment,
          author: req.body.username || "Anonymous"
        }
      }
    }
  );

  const post = await Blog.findOne({ id: req.params.id });
  res.render("index.ejs", { postList: [post], showDel: true });
});

app.post("/posts/new", async (req: Request, res: Response) => {
  const postId = Math.random().toString(36).substr(2, 9);
  try {
    await Blog.create({
      id: postId,
      author: req.body.username || "Anonymous",
      name: req.body.name,
      content: req.body.content,
      comments: []
    });
    const posts: IBlogPost[] = await Blog.find();
    res.render("index.ejs", { postList: posts });
  } catch (err: any) {
    console.error("Failed to add post:", err.message);
    res.status(500).send("Failed to create post");
  }
});

app.delete("/posts/delete/:id", async (req: Request, res: Response) => {
  const customId = req.params.id;
  try {
    await Blog.findOneAndDelete({ id: customId });
    const posts: IBlogPost[] = await Blog.find();
    const index = posts.findIndex(p => p.id === customId);
    if (index !== -1) {
      posts.splice(index, 1);
    }
    res.render("index.ejs", { postList: posts });
  } catch (err: any) {
    console.error("Failed to delete post:", err.message);
    res.status(500).send("Deletion failed");
  }
});


app.patch("/posts/edit/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { name, content } = req.body;

  try {
    const updatedPost = await Blog.findByIdAndUpdate(
      postId,
      { name, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    const posts: IBlogPost[] = await Blog.find();
    const index = posts.findIndex(
      (p) => ((p._id as Types.ObjectId).toString() === postId)
    );

    if (index !== -1) {
      posts[index] = updatedPost;
    }

    res.render("index.ejs", { postList: posts });
  } catch (err: any) {
    console.error("Failed to update post:", err.message);
    res.status(500).send("Update failed");
  }
});

app.get("/posts/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  const posts: IBlogPost[] = await Blog.find();
  const post = await Blog.findOne({ id: postId });

  if (post) {
    res.render("index.ejs", { postList: [post], showDel: true });
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/`);
});
