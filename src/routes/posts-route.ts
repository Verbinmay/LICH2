import { request, Request, Response } from "express";
import { Router } from "express";
import { postsRepository } from "../repositories/posts-repository";
import { PostInputModel } from "../types";
import { body, header } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { blogsRepository } from "../repositories/blogs-repository";
import { avtorizationValidationMiddleware } from "../middlewares/avtorization-validation-middleware";

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
const isBlogIdValidation = body("blogId").custom((value) => {
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
  avtorizationValidationMiddleware,
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
    res.status(201).json(creatersReturn);
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
  avtorizationValidationMiddleware,
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  isBlogIdValidation,
  inputValidationMiddleware,
  (req: Request<{ id: string }, {}, PostInputModel>, res: Response) => {
    let bbcc = postsRepository.findPostById(req.params.id);
    if (bbcc !== undefined) {
      postsRepository.updatePost(
        bbcc,
        req.params.id,
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId
      );
      res.send(204);
    } else {
      res.send(404);
    }
  }
);

postsRouter.delete(
  "/:id",
  avtorizationValidationMiddleware,
  (req: Request, res: Response) => {
    let deletesReturn = postsRepository.deletePost(req.params.id);
    if (deletesReturn[0] === 204) {
      res.send(204);
    } else {
      res.send(404);
    }
  }
);
