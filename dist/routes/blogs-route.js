"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const avtorization_validation_middleware_1 = require("../middlewares/avtorization-validation-middleware");
const blogs_repository_1 = require("../repositories/blogs-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => {
    let foundBlogs = blogs_repository_1.blogsRepository.findBlogs();
    res.status(200).json(foundBlogs);
});
exports.blogsRouter.post("/", avtorization_validation_middleware_1.avtorizationValidationMiddleware, (req, res) => {
    let creatorsReturn = blogs_repository_1.blogsRepository.createBlog(req.body.name, req.body.description, req.body.websiteUrl);
    if (creatorsReturn[1] === false) {
        res.status(400).json(creatorsReturn[0]);
    }
    else {
        res.status(201).json(creatorsReturn[0]);
    }
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
exports.blogsRouter.put("/:id", avtorization_validation_middleware_1.avtorizationValidationMiddleware, (req, res) => {
    let updatesReturn = blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (updatesReturn[0] === 400) {
        res.status(400).json(updatesReturn[1]);
    }
    else if (updatesReturn[0] === 204) {
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
