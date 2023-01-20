"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const bd_1 = require("../bd");
let errorsMessages = [];
function message(a, b) {
    errorsMessages.push({
        message: a,
        field: b,
    });
}
exports.blogsRepository = {
    findBlogs() {
        return bd_1.bd.blogs;
    },
    createBlog(name, description, websiteUrl) {
        let isId = "";
        if (bd_1.bd.blogs.length === 0) {
            isId = "0";
        }
        else if (bd_1.bd.blogs.length === 1) {
            if (bd_1.bd.blogs[0].id !== "0") {
                isId = "0";
            }
            else {
                isId = "1";
            }
        }
        else {
            for (let i = 1; i < bd_1.bd.blogs.length; i++) {
                let elementTwo = bd_1.bd.blogs[i - 1];
                let idTwo = Number(elementTwo.id);
                let elementOne = bd_1.bd.blogs[i];
                let idOne = Number(elementOne.id);
                let raznitsaId = idOne - idTwo;
                if (raznitsaId !== 1) {
                    isId = String(idOne + 1);
                    break;
                }
                if (i === bd_1.bd.blogs.length - 1) {
                    isId = String(idOne + 1);
                    break;
                }
            }
        }
        let isWebsiteUrl = "";
        // if (!websiteUrl) {
        //   message("Write websiteUrl", "websiteUrl");
        // } else if (typeof websiteUrl !== "string") {
        //   message("Please write websiteUrl like string", "websiteUrl");
        // } else if (websiteUrl.slice(0, 8) !== "https://") {
        //   message("Please write websiteUrl (https://)", "websiteUrl");
        // } else if (websiteUrl.length > 100) {
        //   message("Write websiteUrl less 100 letters", "websiteUrl");
        // } else {
        isWebsiteUrl = websiteUrl;
        // }
        const createBlog = {
            id: isId,
            name: name,
            description: description,
            websiteUrl: isWebsiteUrl,
        };
        bd_1.bd.blogs.push(createBlog);
        return createBlog;
    },
    findBlogById(id) {
        let oneBlog = bd_1.bd.blogs.find((p) => p.id === id);
        return oneBlog;
    },
    updateBlog(ddff, id, name, description, websiteUrl) {
        let isWebsiteUrl = "";
        // if (!websiteUrl) {
        //   message("Write websiteUrl", "websiteUrl");
        // } else if (typeof websiteUrl !== "string") {
        //   message("Please write websiteUrl like string", "websiteUrl");
        // } else if (websiteUrl.slice(0, 8) !== "https://") {
        //   message("Please write websiteUrl (https://)", "websiteUrl");
        // } else if (websiteUrl.length > 100) {
        //   message("Write websiteUrl less 100 letters", "websiteUrl");
        // } else {
        isWebsiteUrl = websiteUrl;
        //}
        ddff.name = name;
        ddff.description = description;
        ddff.websiteUrl = isWebsiteUrl;
    },
    deleteblogs(id) {
        let oneBlog = bd_1.bd.blogs.find((p) => p.id === id);
        if (oneBlog !== undefined) {
            bd_1.bd.blogs = bd_1.bd.blogs.filter((p) => p.id !== id);
            return [204];
        }
        else {
            return [404];
        }
    },
};
