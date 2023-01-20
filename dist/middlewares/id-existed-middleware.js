"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idExistedMiddleware = void 0;
const posts_repository_1 = require("../repositories/posts-repository");
let ccdd;
const idExistedMiddleware = (req, res, next) => {
    if (typeof req.query.id === "string") {
        ccdd = posts_repository_1.postsRepository.findPostById(req.query.id);
        if (ccdd === undefined) {
            res.send(404);
        }
        next();
    }
};
exports.idExistedMiddleware = idExistedMiddleware;
