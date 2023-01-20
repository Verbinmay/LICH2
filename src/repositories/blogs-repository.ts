import { bd } from "../bd";
import { ApiErrorResult, BlogViewModel } from "../types";

let errorsMessages: ApiErrorResult = [];
function message(a: string, b: string) {
  errorsMessages.push({
    message: a,
    field: b,
  });
}

export const blogsRepository = {
  findBlogs() {
    return bd.blogs;
  },
  createBlog(name: string, description: string, websiteUrl: string) {

    let isId: string = "";
    if (bd.blogs.length === 0) {
      isId = "0";
    } else if (bd.blogs.length === 1) {
      if (bd.blogs[0].id !== "0") {
        isId = "0";
      } else {
        isId = "1";
      }
    } else {
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

    let isWebsiteUrl: string = "";
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

    const createBlog: BlogViewModel = {
      id: isId,
      name: name,
      description: description,
      websiteUrl: isWebsiteUrl,
    };
    bd.blogs.push(createBlog);
    return createBlog;
  },
  findBlogById(id: string) {
    let oneBlog = bd.blogs.find((p) => p.id === id);
    return oneBlog;
  },
  updateBlog(
    ddff:BlogViewModel,
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
      let isWebsiteUrl: string = "";
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
  deleteblogs(id: string) {
    let oneBlog = bd.blogs.find((p) => p.id === id);
    if (oneBlog !== undefined) {
      bd.blogs = bd.blogs.filter((p) => p.id !== id);
      return [204];
    } else {
      return [404];
    }
  },
};
