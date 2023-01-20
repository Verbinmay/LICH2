import { Request, Response } from "express";
import { Router } from "express";
import { postsRepository } from "../repositories/posts-repository";
import { PostInputModel } from "../types";
import { body } from "express-validator";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { blogsRepository } from "../repositories/blogs-repository";
import { avtorizationValidationMiddleware } from "../middlewares/avtorization-validation-middleware";

export const postsRouter = Router({});

const titleValidation = body("title")
  .isString()
  .trim()
  .isLength({max: 30 })
  .withMessage("Title error");
const shortDescriptionValidation = body("shortDescription")
  .isString()
  .trim()
  .isLength({  max: 100 })
  .withMessage("shortDescription error");
const contentValidation = body("content")
  .isString()
  .trim()
  .isLength({ max: 1000 })
  .withMessage("content error");
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
  if (onePost !== undefined) {
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
