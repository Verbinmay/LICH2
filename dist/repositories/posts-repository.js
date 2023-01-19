"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const bd_1 = require("../bd");
let errorsMessages = [];
function message(a, b) {
    errorsMessages.push({
        message: a,
        field: b,
    });
}
exports.postsRepository = {
    findPosts() {
        return bd_1.bd.posts;
    },
    createPost(title, shortDescription, content, blogId) {
        errorsMessages = [];
        let isId = "";
        if (bd_1.bd.posts.length === 0) {
            isId = "0";
        }
        else if (bd_1.bd.posts.length === 1) {
            if (bd_1.bd.posts[0].id !== "0") {
                isId = "0";
            }
            else {
                isId = "1";
            }
        }
        else {
            for (let i = 1; i < bd_1.bd.posts.length; i++) {
                let elementTwo = bd_1.bd.posts[i - 1];
                let idTwo = Number(elementTwo.id);
                let elementOne = bd_1.bd.posts[i];
                let idOne = Number(elementOne.id);
                let raznitsaId = idOne - idTwo;
                if (raznitsaId !== 1) {
                    isId = String(idOne + 1);
                    break;
                }
                if (i === bd_1.bd.posts.length - 1) {
                    isId = String(idOne + 1);
                    break;
                }
            }
        }
        let isTitle = "";
        if (!title) {
            message("Write title", "title");
        }
        else if (typeof title !== "string") {
            message("Please write string", "title");
        }
        else if (title.length > 30) {
            message("Write title less 30 letters", "title");
        }
        else {
            isTitle = title;
        }
        let isShortDescription = "";
        if (!shortDescription) {
            message("Write shortDescription", "shortDescription");
        }
        else if (typeof shortDescription !== "string") {
            message("Please write string", "shortDescription");
        }
        else if (shortDescription.length > 100) {
            message("Write shortDescription less 100 letters", "shortDescription");
        }
        else {
            isShortDescription = shortDescription;
        }
        let isContent = "";
        if (!content) {
            message("Write content", "content");
        }
        else if (typeof content !== "string") {
            message("Please write content like string", "content");
        }
        else if (content.length > 1000) {
            message("Write content less 1000 letters", "content");
        }
        else {
            isContent = content;
        }
        let g = false;
        let isBlogName = "";
        for (let aa = 0; aa < bd_1.bd.blogs.length; aa++) {
            if (blogId === bd_1.bd.blogs[aa].id) {
                g = true;
                isBlogName = bd_1.bd.blogs[aa].name;
                break;
            }
        }
        let isBlogId = "";
        if (!blogId) {
            message("Write blogId", "blogId");
        }
        else if (typeof blogId !== "string") {
            message("Please write blogId like string", "blogId");
        }
        else if (g === false) {
            message("Please insert existed user id", "blogId");
        }
        else {
            isBlogId = blogId;
        }
        if (errorsMessages.length > 0) {
            return [400, { errorsMessages: errorsMessages }];
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
            bd_1.bd.posts.push(createPost);
            return [201, createPost];
        }
    },
    findPostById(id) {
        let onePost = bd_1.bd.posts.find((p) => p.id === id);
        return onePost;
    },
    updatePost(id, title, shortDescription, content, blogId) {
        let onePost = bd_1.bd.posts.find((p) => p.id === id);
        if (onePost) {
            errorsMessages = [];
            let isTitle = "";
            if (!title) {
                message("Write title", "title");
            }
            else if (typeof title !== "string") {
                message("Please write string", "title");
            }
            else if (title.length > 30) {
                message("Write title less 30 letters", "title");
            }
            else {
                isTitle = title;
            }
            let isShortDescription = "";
            if (!shortDescription) {
                message("Write shortDescription", "shortDescription");
            }
            else if (typeof shortDescription !== "string") {
                message("Please write string", "shortDescription");
            }
            else if (shortDescription.length > 100) {
                message("Write shortDescription less 100 letters", "shortDescription");
            }
            else {
                isShortDescription = shortDescription;
            }
            let isContent = "";
            if (!content) {
                message("Write content", "content");
            }
            else if (typeof content !== "string") {
                message("Please write content like string", "content");
            }
            else if (content.length > 1000) {
                message("Write content less 1000 letters", "content");
            }
            else {
                isContent = content;
            }
            let g = false;
            let isBlogName = "";
            for (let aa = 0; aa < bd_1.bd.blogs.length; aa++) {
                if (blogId === bd_1.bd.blogs[aa].id) {
                    g = true;
                    isBlogName = bd_1.bd.blogs[aa].name;
                    break;
                }
            }
            let isBlogId = "";
            if (!blogId) {
                message("Write blogId", "blogId");
            }
            else if (typeof blogId !== "string") {
                message("Please write blogId like string", "blogId");
            }
            else if (g === false) {
                message("Please insert existed user id", "blogId");
            }
            else {
                isBlogId = blogId;
            }
            if (errorsMessages.length > 0) {
                return [400, { errorsMessages: errorsMessages }];
            }
            else {
                onePost.title = isTitle;
                onePost.shortDescription = isShortDescription;
                onePost.content = isContent;
                onePost.blogId = isBlogId;
                onePost.blogName = isBlogName;
                return [204];
            }
        }
        else {
            return [404];
        }
    },
    deletePost(id) {
        let onePost = bd_1.bd.posts.find((p) => p.id === id);
        if (onePost) {
            bd_1.bd.posts = bd_1.bd.posts.filter((p) => p.id !== id);
            return [204];
        }
        else {
            return [404];
        }
    },
};
