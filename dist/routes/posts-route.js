"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => {
    let foundPosts = posts_repository_1.postsRepository.findPosts();
    res.status(200).json(foundPosts);
});
exports.postsRouter.post("/", (req, res) => {
    const creatersReturn = posts_repository_1.postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (creatersReturn[0] === 400) {
        res.status(400).json(creatersReturn[1]);
    }
    else {
        res.status(201).json(creatersReturn[1]);
    }
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
exports.postsRouter.put("/:id", (req, res) => {
    const updatesRetern = posts_repository_1.postsRepository.updatePost(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (updatesRetern[0] === 400) {
        res.status(400).json(updatesRetern[1]);
    }
    else if (updatesRetern[0] === 204) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.postsRouter.delete("/:id", (req, res) => {
    let deletesReturn = posts_repository_1.postsRepository.deletePost(req.params.id);
    if (deletesReturn[0] === 204) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
