"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const avtorization_validation_middleware_1 = require("../middlewares/avtorization-validation-middleware");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
const nameValidation = (0, express_validator_1.body)("name")
    .isString()
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage("Title error");
const descriptionValidation = (0, express_validator_1.body)("description")
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Description error");
const websiteUrlValidation = (0, express_validator_1.body)("websiteUrl")
    .isURL()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("WebsiteUrl error");
exports.blogsRouter.get("/", (req, res) => {
    let foundBlogs = blogs_repository_1.blogsRepository.findBlogs();
    res.status(200).json(foundBlogs);
});
exports.blogsRouter.post("/", avtorization_validation_middleware_1.avtorizationValidationMiddleware, nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    let creatorsReturn = blogs_repository_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).json(creatorsReturn);
});
exports.blogsRouter.get("/:id", (req, res) => {
    let oneBlog = blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (oneBlog) {
        res.status(200).json(oneBlog);
    }
    else {
        res.send(404);
    }
});
exports.blogsRouter.put("/:id", avtorization_validation_middleware_1.avtorizationValidationMiddleware, nameValidation, descriptionValidation, websiteUrlValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    let ddff = blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (ddff !== undefined) {
        blogs_repository_1.blogsRepository.updateBlog(ddff, req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.blogsRouter.delete("/:id", avtorization_validation_middleware_1.avtorizationValidationMiddleware, (req, res) => {
    let deletesReturn = blogs_repository_1.blogsRepository.deleteblogs(req.params.id);
    if ((deletesReturn[0] = 204)) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
