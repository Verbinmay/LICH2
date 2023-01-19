import { bd } from "../bd";
import { ApiErrorResult, PostViewModel } from "../types";

let errorsMessages: ApiErrorResult = [];
function message(a: string, b: string) {
  errorsMessages.push({
    message: a,
    field: b,
  });
}

export const postsRepository = {
  findPosts() {
    return bd.posts;
  },
  createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) {
    errorsMessages = [];

    let isId: string = "";
    if (bd.posts.length === 0) {
      isId = "0";
    } else if (bd.posts.length === 1) {
      if (bd.posts[0].id !== "0") {
        isId = "0";
      } else {
        isId = "1";
      }
    } else {
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

    let isTitle: string = "";
    if (!title) {
      message("Write title", "title");
    } else if (typeof title !== "string") {
      message("Please write string", "title");
    } else if (title.length > 30) {
      message("Write title less 30 letters", "title");
    } else {
      isTitle = title;
    }

    let isShortDescription: string = "";
    if (!shortDescription) {
      message("Write shortDescription", "shortDescription");
    } else if (typeof shortDescription !== "string") {
      message("Please write string", "shortDescription");
    } else if (shortDescription.length > 100) {
      message("Write shortDescription less 100 letters", "shortDescription");
    } else {
      isShortDescription = shortDescription;
    }

    let isContent: string = "";
    if (!content) {
      message("Write content", "content");
    } else if (typeof content !== "string") {
      message("Please write content like string", "content");
    } else if (content.length > 1000) {
      message("Write content less 1000 letters", "content");
    } else {
      isContent = content;
    }
    let g: boolean = false;
    let isBlogName: string = "";

    for (let aa = 0; aa < bd.blogs.length; aa++) {
      if (blogId === bd.blogs[aa].id) {
        g = true;
        isBlogName = bd.blogs[aa].name;
        break;
      }
    }

    let isBlogId: string = "";
    if (!blogId) {
      message("Write blogId", "blogId");
    } else if (typeof blogId !== "string") {
      message("Please write blogId like string", "blogId");
    } else if (g === false) {
      message("Please insert existed user id", "blogId");
    } else {
      isBlogId = blogId;
    }

    if (errorsMessages.length > 0) {
      return [400, { errorsMessages: errorsMessages }];
    } else {
      const createPost: PostViewModel = {
        id: isId,
        title: isTitle,
        shortDescription: isShortDescription,
        content: isContent,
        blogId: isBlogId,
        blogName: isBlogName,
      };
      bd.posts.push(createPost);
      return [201, createPost];
    }
  },
  findPostById(id: string) {
    let onePost = bd.posts.find((p) => p.id === id);
    return onePost;
  },
  updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) {
    let onePost = bd.posts.find((p) => p.id === id);
    if (onePost) {
      errorsMessages = [];

      let isTitle: string = "";
      if (!title) {
        message("Write title", "title");
      } else if (typeof title !== "string") {
        message("Please write string", "title");
      } else if (title.length > 30) {
        message("Write title less 30 letters", "title");
      } else {
        isTitle = title;
      }

      let isShortDescription: string = "";
      if (!shortDescription) {
        message("Write shortDescription", "shortDescription");
      } else if (typeof shortDescription !== "string") {
        message("Please write string", "shortDescription");
      } else if (shortDescription.length > 100) {
        message("Write shortDescription less 100 letters", "shortDescription");
      } else {
        isShortDescription = shortDescription;
      }

      let isContent: string = "";
      if (!content) {
        message("Write content", "content");
      } else if (typeof content !== "string") {
        message("Please write content like string", "content");
      } else if (content.length > 1000) {
        message("Write content less 1000 letters", "content");
      } else {
        isContent = content;
      }
      let g: boolean = false;
      let isBlogName: string = "";

      for (let aa = 0; aa < bd.blogs.length; aa++) {
        if (blogId === bd.blogs[aa].id) {
          g = true;
          isBlogName = bd.blogs[aa].name;
          break;
        }
      }

      let isBlogId: string = "";
      if (!blogId) {
        message("Write blogId", "blogId");
      } else if (typeof blogId !== "string") {
        message("Please write blogId like string", "blogId");
      } else if (g === false) {
        message("Please insert existed user id", "blogId");
      } else {
        isBlogId = blogId;
      }

      if (errorsMessages.length > 0) {
        return [400, { errorsMessages: errorsMessages }];
      } else {
        onePost.title = isTitle;
        onePost.shortDescription = isShortDescription;
        onePost.content = isContent;
        onePost.blogId = isBlogId;
        onePost.blogName = isBlogName;
        return [204];
      }
    } else {
      return [404];
    }
  },
  deletePost(id: string) {
    let onePost = bd.posts.find((p) => p.id === id);
    if (onePost) {
      bd.posts = bd.posts.filter((p) => p.id !== id);
      return [204];
    } else {
      return [404];
    }
  },
};
