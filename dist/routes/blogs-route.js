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
    .withMessage("Not name")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Name is empty")
    .bail()
    .isLength({ max: 15 })
    .withMessage("Names length must be max 15");
const descriptionValidation = (0, express_validator_1.body)("description")
    .isString()
    .withMessage("Isnt string")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("Description is empty")
    .bail()
    .isLength({ max: 500 })
    .withMessage("Description length must be max 500");
const websiteUrlValidation = (0, express_validator_1.body)("websiteUrl")
    .isURL()
    .withMessage("Isnt URL")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("WebsiteURL is empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("WebsiteUrl ength must be max 100");
exports.blogsRouter.get("/", (req, res) => {
    let foundBlogs = blogs_repository_1.blogsRepository.findBlogs();
    res.status(200).json(foundBlogs);
});
exports.blogsRouter.post("/", avtorization_validation_middleware_1.avtorizationValidationMiddleware, websiteUrlValidation, nameValidation, descriptionValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
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
exports.blogsRouter.put("/:id", avtorization_validation_middleware_1.avtorizationValidationMiddleware, websiteUrlValidation, nameValidation, descriptionValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
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
    if (deletesReturn[0] === 204) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
