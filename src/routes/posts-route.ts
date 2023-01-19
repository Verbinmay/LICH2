import { Request, Response } from "express";
import { Router } from "express";
import { postsRepository } from "../repositories/posts-repository";
import { PostInputModel } from "../types";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { bd } from "../bd";
import { blogsRepository } from "../repositories/blogs-repository";

export const postsRouter = Router({});

const titleValidation = body("title")
  .isString()
  .withMessage("Title error")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Write title less 30 letters");
const shortDescriptionValidation = body("shortDescription")
  .isString()
  .withMessage("shortDescription error")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("Write shortDescription less 100 letters");
const contentValidation = body("content")
  .isString()
  .withMessage("content error")
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage("Write content less 1000 letters");
const isBlogIdValidation = body("isBlogId").custom((value) => {
  if (value !== blogsRepository.findBlogById(value)?.id) {
    throw new Error("Please insert existed user id");
  }
  return true;
});


postsRouter.get("/", (req: Request, res: Response) => {
  let foundPosts = postsRepository.findPosts();
  res.status(200).json(foundPosts);
});

postsRouter.post(
  "/",
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  isBlogIdValidation,
  inputValidationMiddleware,
  (req: Request<{}, {}, PostInputModel>, res: Response) => {
    const creatersReturn = postsRepository.createPost(
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId
    );
    if (creatersReturn[0] === 400) {
      res.status(400).json(creatersReturn[1]);
    } else {
      res.status(201).json(creatersReturn[1]);
    }
  }
);

postsRouter.get("/:id", (req: Request, res: Response) => {
  let onePost = postsRepository.findPostById(req.params.id);
  if (onePost) {
    res.status(200).json(onePost);
  } else {
    res.send(404);
  }
});

postsRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, PostInputModel>, res: Response) => {
    const updatesRetern = postsRepository.updatePost(
      req.params.id,
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId
    );
    if (updatesRetern[0] === 400) {
      res.status(400).json(updatesRetern[1]);
    } else if (updatesRetern[0] === 204) {
      res.send(204);
    } else {
      res.send(404);
    }
  }
);

postsRouter.delete("/:id", (req: Request, res: Response) => {
  let deletesReturn = postsRepository.deletePost(req.params.id);
  if (deletesReturn[0] === 204) {
    res.send(204);
  } else {
    res.send(404);
  }
});
