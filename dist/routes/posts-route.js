"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const express_validator_1 = require("express-validator");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const blogs_repository_1 = require("../repositories/blogs-repository");
const avtorization_validation_middleware_1 = require("../middlewares/avtorization-validation-middleware");
exports.postsRouter = (0, express_1.Router)({});
const titleValidation = (0, express_validator_1.body)("title")
    .isString()
    .withMessage("Title error")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Write title less 30 letters");
const shortDescriptionValidation = (0, express_validator_1.body)("shortDescription")
    .isString()
    .withMessage("shortDescription error")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Write shortDescription less 100 letters");
const contentValidation = (0, express_validator_1.body)("content")
    .isString()
    .withMessage("content error")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Write content less 1000 letters");
const isBlogIdValidation = (0, express_validator_1.body)("blogId").custom((value) => {
    var _a;
    if (value !== ((_a = blogs_repository_1.blogsRepository.findBlogById(value)) === null || _a === void 0 ? void 0 : _a.id)) {
        throw new Error("Please insert existed user id");
    }
    return true;
});
exports.postsRouter.get("/", (req, res) => {
    let foundPosts = posts_repository_1.postsRepository.findPosts();
    res.status(200).json(foundPosts);
});
exports.postsRouter.post("/", avtorization_validation_middleware_1.avtorizationValidationMiddleware, titleValidation, shortDescriptionValidation, contentValidation, isBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const creatersReturn = posts_repository_1.postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.status(201).json(creatersReturn);
});
exports.postsRouter.get("/:id", (req, res) => {
    let onePost = posts_repository_1.postsRepository.findPostById(req.params.id);
    if (onePost) {
        res.status(200).json(onePost);
    }
    else {
        res.send(404);
    }
});
exports.postsRouter.put("/:id", avtorization_validation_middleware_1.avtorizationValidationMiddleware, titleValidation, shortDescriptionValidation, contentValidation, isBlogIdValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    let bbcc = posts_repository_1.postsRepository.findPostById(req.params.id);
    if (bbcc !== undefined) {
        posts_repository_1.postsRepository.updatePost(bbcc, req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.postsRouter.delete("/:id", avtorization_validation_middleware_1.avtorizationValidationMiddleware, (req, res) => {
    let deletesReturn = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (deletesReturn[0] === 204) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
