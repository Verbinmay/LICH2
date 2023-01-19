import express, { NextFunction, Request, Response } from "express";
import { bd } from "./bd";
import { blogsRouter } from "./routes/blogs-route";
import { postsRouter } from "./routes/posts-route";

const app = express();
const port = process.env.PORT || 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);
app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);

app.delete("/testing/all-data", (req: Request, res: Response) => {
  bd.posts = [];
  bd.blogs = [];
  res.send(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
