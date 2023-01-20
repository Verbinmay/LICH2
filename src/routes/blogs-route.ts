import { Request, Response } from "express";
import { Router } from "express";
import { avtorizationValidationMiddleware } from "../middlewares/avtorization-validation-middleware";
import { blogsRepository } from "../repositories/blogs-repository";
import { BlogInputModel } from "../types";


export const blogsRouter = Router({});

blogsRouter.get("/", (req: Request, res: Response) => {
  let foundBlogs = blogsRepository.findBlogs();
  res.status(200).json(foundBlogs);
});

blogsRouter.post("/",avtorizationValidationMiddleware, (req: Request<{}, {}, BlogInputModel>, res: Response) => {
  let creatorsReturn = blogsRepository.createBlog(
    req.body.name,
    req.body.description,
    req.body.websiteUrl
  );

  if (creatorsReturn[1] === false) {
    res.status(400).json(creatorsReturn[0]);
  } else {
    res.status(201).json(creatorsReturn[0]);
  }
});

blogsRouter.get("/:id", (req: Request, res: Response) => {
  let oneBlog = blogsRepository.findBlogById(req.params.id);
  if (oneBlog) {
    res.status(200).json(oneBlog);
  } else {
    res.send(404);
  }
});

blogsRouter.put(
  "/:id", avtorizationValidationMiddleware,
  (req: Request<{ id: string }, {}, BlogInputModel>, res: Response) => {
    let updatesReturn = blogsRepository.updateBlog(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (updatesReturn[0] === 400) {
      res.status(400).json(updatesReturn[1]);
    } else if (updatesReturn[0] === 204) {
      res.send(204);
    } else {
      res.send(404);
    }
  }
);

blogsRouter.delete("/:id", avtorizationValidationMiddleware,(req: Request, res: Response) => {
  let deletesReturn = blogsRepository.deleteblogs(req.params.id);
  if ((deletesReturn[0] = 204)) {
    res.send(204);
  } else {
    res.send(404);
  }
});
