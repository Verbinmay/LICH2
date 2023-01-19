"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bd_1 = require("./bd");
const blogs_route_1 = require("./routes/blogs-route");
const posts_route_1 = require("./routes/posts-route");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
app.use("/blogs", blogs_route_1.blogsRouter);
app.use("/posts", posts_route_1.postsRouter);
app.delete("/testing/all-data", (req, res) => {
    bd_1.bd.posts = [];
    bd_1.bd.blogs = [];
    res.send(204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
