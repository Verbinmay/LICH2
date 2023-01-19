"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
let bd = {
    blogs: [],
    posts: [],
};
let errorsMessages = [];
function message(a, b) {
    errorsMessages.push({
        message: a,
        field: b,
    });
}
app.get("/blogs", (req, res) => {
    res.status(200).json(bd.blogs);
});
app.post("/blogs", (req, res) => {
    errorsMessages = [];
    let isId = "";
    if (bd.blogs.length === 0) {
        isId = "0";
    }
    else if (bd.blogs.length === 1) {
        if (bd.blogs[0].id !== "0") {
            isId = "0";
        }
        else {
            isId = "1";
        }
    }
    else {
        for (let i = 1; i < bd.blogs.length; i++) {
            let elementTwo = bd.blogs[i - 1];
            let idTwo = Number(elementTwo.id);
            let elementOne = bd.blogs[i];
            let idOne = Number(elementOne.id);
            let raznitsaId = idOne - idTwo;
            if (raznitsaId !== 1) {
                isId = String(idOne + 1);
                break;
            }
            if (i === bd.blogs.length - 1) {
                isId = String(idOne + 1);
                break;
            }
        }
    }
    let isName = "";
    if (!req.body.name) {
        message("Write name", "name");
    }
    else if (typeof req.body.name !== "string") {
        message("Please write string", "name");
    }
    else if (req.body.name.length > 15) {
        message("Write name less 15 letters", "name");
    }
    else {
        isName = req.body.name;
    }
    let isDescription = "";
    if (!req.body.description) {
        message("Write description", "description");
    }
    else if (typeof req.body.description !== "string") {
        message("Please write string", "description");
    }
    else if (req.body.description.length > 500) {
        message("Write description less 500 letters", "description");
    }
    else {
        isDescription = req.body.description;
    }
    let isWebsiteUrl = "";
    if (!req.body.websiteUrl) {
        message("Write websiteUrl", "websiteUrl");
    }
    else if (typeof req.body.websiteUrl !== "string") {
        message("Please write websiteUrl like string", "websiteUrl");
    }
    else if (req.body.websiteUrl.slice(0, 8) !== "https://") {
        message("Please write websiteUrl (https://)", "websiteUrl");
    }
    else if (req.body.websiteUrl.length > 100) {
        message("Write websiteUrl less 100 letters", "websiteUrl");
    }
    else {
        isWebsiteUrl = req.body.websiteUrl;
    }
    if (errorsMessages.length > 0) {
        res.status(400).json({ errorsMessages: errorsMessages });
    }
    else {
        const createBlog = {
            id: isId,
            name: isName,
            description: isDescription,
            websiteUrl: isWebsiteUrl,
        };
        bd.blogs.push(createBlog);
        res.status(201).json(createBlog);
    }
});
app.get("/blogs/:id", (req, res) => {
    let id = req.params.id;
    let oneBlog = bd.blogs.find((p) => p.id === id);
    if (oneBlog) {
        res.status(200).json(oneBlog);
    }
    else {
        res.send(404);
    }
});
app.put("/blogs/:id", (req, res) => {
    let id = req.params.id;
    let oneBlog = bd.blogs.find((p) => p.id === id);
    if (oneBlog) {
        errorsMessages = [];
        let isName = "";
        if (!req.body.name) {
            message("Write name", "name");
        }
        else if (typeof req.body.name !== "string") {
            message("Please write string", "name");
        }
        else if (req.body.name.length > 15) {
            message("Write name less 15 letters", "name");
        }
        else {
            isName = req.body.name;
        }
        let isDescription = "";
        if (!req.body.description) {
            message("Write description", "description");
        }
        else if (typeof req.body.description !== "string") {
            message("Please write string", "description");
        }
        else if (req.body.description.length > 500) {
            message("Write description less 500 letters", "description");
        }
        else {
            isDescription = req.body.description;
        }
        let isWebsiteUrl = "";
        if (!req.body.websiteUrl) {
            message("Write websiteUrl", "websiteUrl");
        }
        else if (typeof req.body.websiteUrl !== "string") {
            message("Please write websiteUrl like string", "websiteUrl");
        }
        else if (req.body.websiteUrl.slice(0, 8) !== "https://") {
            message("Please write websiteUrl (https://)", "websiteUrl");
        }
        else if (req.body.websiteUrl.length > 100) {
            message("Write websiteUrl less 100 letters", "websiteUrl");
        }
        else {
            isWebsiteUrl = req.body.websiteUrl;
        }
        if (errorsMessages.length > 0) {
            res.status(400).json({ errorsMessages: errorsMessages });
        }
        else {
            oneBlog.name = isName;
            oneBlog.description = isDescription;
            oneBlog.websiteUrl = isWebsiteUrl;
            res.send(204);
        }
    }
    else {
        res.send(404);
    }
});
app.delete("/blogs/:id", (req, res) => {
    let id = req.params.id;
    let oneBlog = bd.blogs.find((p) => p.id === id);
    if (oneBlog) {
        bd.blogs = bd.blogs.filter((p) => p.id !== id);
        res.send(204);
    }
    else {
        res.send(404);
    }
});
app.get("/posts", (req, res) => {
    res.status(200).json(bd.posts);
});
app.post("/posts", (req, res) => {
    errorsMessages = [];
    let isId = "";
    if (bd.posts.length === 0) {
        isId = "0";
    }
    else if (bd.posts.length === 1) {
        if (bd.posts[0].id !== "0") {
            isId = "0";
        }
        else {
            isId = "1";
        }
    }
    else {
        for (let i = 1; i < bd.posts.length; i++) {
            let elementTwo = bd.posts[i - 1];
            let idTwo = Number(elementTwo.id);
            let elementOne = bd.posts[i];
            let idOne = Number(elementOne.id);
            let raznitsaId = idOne - idTwo;
            if (raznitsaId !== 1) {
                isId = String(idOne + 1);
                break;
            }
            if (i === bd.posts.length - 1) {
                isId = String(idOne + 1);
                break;
            }
        }
    }
    let isTitle = "";
    if (!req.body.title) {
        message("Write title", "title");
    }
    else if (typeof req.body.title !== "string") {
        message("Please write string", "title");
    }
    else if (req.body.title.length > 30) {
        message("Write title less 30 letters", "title");
    }
    else {
        isTitle = req.body.title;
    }
    let isShortDescription = "";
    if (!req.body.shortDescription) {
        message("Write shortDescription", "shortDescription");
    }
    else if (typeof req.body.shortDescription !== "string") {
        message("Please write string", "shortDescription");
    }
    else if (req.body.shortDescription.length > 100) {
        message("Write shortDescription less 100 letters", "shortDescription");
    }
    else {
        isShortDescription = req.body.shortDescription;
    }
    let isContent = "";
    if (!req.body.content) {
        message("Write content", "content");
    }
    else if (typeof req.body.content !== "string") {
        message("Please write content like string", "content");
    }
    else if (req.body.content.length > 1000) {
        message("Write content less 1000 letters", "content");
    }
    else {
        isContent = req.body.content;
    }
    let g = false;
    let isBlogName = "";
    for (let aa = 0; aa < bd.blogs.length; aa++) {
        if (req.body.blogId === bd.blogs[aa].id) {
            g = true;
            isBlogName = bd.blogs[aa].name;
            break;
        }
    }
    let isBlogId = "";
    if (!req.body.blogId) {
        message("Write blogId", "blogId");
    }
    else if (typeof req.body.blogId !== "string") {
        message("Please write blogId like string", "blogId");
    }
    else if (g === false) {
        message("Please insert existed user id", "blogId");
    }
    else {
        isBlogId = req.body.blogId;
    }
    if (errorsMessages.length > 0) {
        res.status(400).json({ errorsMessages: errorsMessages });
    }
    else {
        const createPost = {
            id: isId,
            title: isTitle,
            shortDescription: isShortDescription,
            content: isContent,
            blogId: isBlogId,
            blogName: isBlogName,
        };
        bd.posts.push(createPost);
        res.status(201).json(createPost);
    }
});
app.get("/posts/:id", (req, res) => {
    let id = req.params.id;
    let onePost = bd.posts.find((p) => p.id === id);
    if (onePost) {
        res.status(200).json(onePost);
    }
    else {
        res.send(404);
    }
});
app.put("/posts/:id", (req, res) => {
    let id = req.params.id;
    let onePost = bd.posts.find((p) => p.id === id);
    if (onePost) {
        errorsMessages = [];
        let isTitle = "";
        if (!req.body.title) {
            message("Write title", "title");
        }
        else if (typeof req.body.title !== "string") {
            message("Please write string", "title");
        }
        else if (req.body.title.length > 30) {
            message("Write title less 30 letters", "title");
        }
        else {
            isTitle = req.body.title;
        }
        let isShortDescription = "";
        if (!req.body.shortDescription) {
            message("Write shortDescription", "shortDescription");
        }
        else if (typeof req.body.shortDescription !== "string") {
            message("Please write string", "shortDescription");
        }
        else if (req.body.shortDescription.length > 100) {
            message("Write shortDescription less 100 letters", "shortDescription");
        }
        else {
            isShortDescription = req.body.shortDescription;
        }
        let isContent = "";
        if (!req.body.content) {
            message("Write content", "content");
        }
        else if (typeof req.body.content !== "string") {
            message("Please write content like string", "content");
        }
        else if (req.body.content.length > 1000) {
            message("Write content less 1000 letters", "content");
        }
        else {
            isContent = req.body.content;
        }
        let g = false;
        let isBlogName = "";
        for (let aa = 0; aa < bd.blogs.length; aa++) {
            if (req.body.blogId === bd.blogs[aa].id) {
                g = true;
                isBlogName = bd.blogs[aa].name;
                break;
            }
        }
        let isBlogId = "";
        if (!req.body.blogId) {
            message("Write blogId", "blogId");
        }
        else if (typeof req.body.blogId !== "string") {
            message("Please write blogId like string", "blogId");
        }
        else if (g === false) {
            message("Please insert existed user id", "blogId");
        }
        else {
            isBlogId = req.body.blogId;
        }
        if (errorsMessages.length > 0) {
            res.status(400).json({ errorsMessages: errorsMessages });
        }
        else {
            (onePost.title = isTitle),
                (onePost.shortDescription = isShortDescription),
                (onePost.content = isContent),
                (onePost.blogId = isBlogId),
                (onePost.blogName = isBlogName),
                res.send(204);
        }
    }
    else {
        res.send(404);
    }
});
app.delete("/posts/:id", (req, res) => {
    let id = req.params.id;
    let onePost = bd.posts.find((p) => p.id === id);
    if (onePost) {
        bd.posts = bd.posts.filter((p) => p.id !== id);
        res.send(204);
    }
    else {
        res.send(404);
    }
});
app.delete("/testing/all-data", (req, res) => {
    bd.posts = [];
    bd.blogs = [];
    res.send(204);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
