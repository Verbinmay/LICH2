import { BADFAMILY } from "dns";
import { Request, Response } from "express";
import { Router } from "express";
import { body } from "express-validator";
import { avtorizationValidationMiddleware } from "../middlewares/avtorization-validation-middleware";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import { blogsRepository } from "../repositories/blogs-repository";
import { BlogInputModel } from "../types";

export const blogsRouter = Router({});

const nameValidation = body("name")
  .isString()
  .withMessage("Not name")
  .bail()
  .trim()
  .notEmpty()
  .withMessage("Name is empty")
  .bail()
  .isLength({ max: 15 })
  .withMessage("Names length must be max 15");
const descriptionValidation = body("description")
  .isString()
  .withMessage("Isnt string")
  .bail()
  .trim()
  .notEmpty()
  .withMessage("Description is empty")
  .bail()
  .isLength({ max: 500 })
  .withMessage("Description length must be max 500");
const websiteUrlValidation = body("websiteUrl")
  .isURL()
  .withMessage("Isnt URL")
  .bail()
  .trim()
  .notEmpty()
  .withMessage("WebsiteURL is empty")
  .bail()
  .isLength({ max: 100 })
  .withMessage("WebsiteUrl ength must be max 100");

blogsRouter.get("/", (req: Request, res: Response) => {
  let foundBlogs = blogsRepository.findBlogs();
  res.status(200).json(foundBlogs);
});

blogsRouter.post(
  "/",
  avtorizationValidationMiddleware,
  websiteUrlValidation,
  nameValidation,
  descriptionValidation,
  inputValidationMiddleware,
  (req: Request<{}, {}, BlogInputModel>, res: Response) => {
    let creatorsReturn = blogsRepository.createBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    res.status(201).json(creatorsReturn);
  }
);

blogsRouter.get("/:id", (req: Request, res: Response) => {
  let oneBlog = blogsRepository.findBlogById(req.params.id);
  if (oneBlog) {
    res.status(200).json(oneBlog);
  } else {
    res.send(404);
  }
});

blogsRouter.put(
  "/:id",
  avtorizationValidationMiddleware,
  websiteUrlValidation,
  nameValidation,
  descriptionValidation,
  inputValidationMiddleware,
  (req: Request<{ id: string }, {}, BlogInputModel>, res: Response) => {
    let ddff = blogsRepository.findBlogById(req.params.id);
    if (ddff !== undefined) {
      blogsRepository.updateBlog(
        ddff,
        req.params.id,
        req.body.name,
        req.body.description,
        req.body.websiteUrl
      );
      res.send(204);
    } else {
      res.send(404);
    }
  }
);

blogsRouter.delete(
  "/:id",
  avtorizationValidationMiddleware,
  (req: Request, res: Response) => {
    let deletesReturn = blogsRepository.deleteblogs(req.params.id);
    if (deletesReturn[0] === 204) {
      res.send(204);
    } else {
      res.send(404);
    }
  }
);
