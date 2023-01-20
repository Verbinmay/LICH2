"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const bd_1 = require("../bd");
const blogs_repository_1 = require("./blogs-repository");
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
        var _a;
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
        let isBlogName = "";
        let aabb = (_a = blogs_repository_1.blogsRepository.findBlogById(blogId)) === null || _a === void 0 ? void 0 : _a.name;
        if (aabb !== undefined) {
            isBlogName = aabb;
        }
        const createPost = {
            id: isId,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: isBlogName,
        };
        bd_1.bd.posts.push(createPost);
        return createPost;
    },
    findPostById(id) {
        let onePost = bd_1.bd.posts.find((p) => p.id === id);
        return onePost;
    },
    updatePost(bbcc, id, title, shortDescription, content, blogId) {
        var _a;
        let isBlogName = "";
        let aabb = (_a = blogs_repository_1.blogsRepository.findBlogById(blogId)) === null || _a === void 0 ? void 0 : _a.name;
        if (aabb !== undefined) {
            isBlogName = aabb;
        }
        bbcc.title = title;
        bbcc.shortDescription = shortDescription;
        bbcc.content = content;
        bbcc.blogId = blogId;
        bbcc.blogName = isBlogName;
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
