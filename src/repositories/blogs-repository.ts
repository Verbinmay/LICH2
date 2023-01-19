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
    errorsMessages = [];

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

    let isName: string = "";
    if (!name) {
      message("Write name", "name");
    } else if (typeof name !== "string") {
      message("Please write string", "name");
    } else if (name.length > 15) {
      message("Write name less 15 letters", "name");
    } else {
      isName = name;
    }

    let isDescription: string = "";
    if (!description) {
      message("Write description", "description");
    } else if (typeof description !== "string") {
      message("Please write string", "description");
    } else if (description.length > 500) {
      message("Write description less 500 letters", "description");
    } else {
      isDescription = description;
    }

    let isWebsiteUrl: string = "";
    if (!websiteUrl) {
      message("Write websiteUrl", "websiteUrl");
    } else if (typeof websiteUrl !== "string") {
      message("Please write websiteUrl like string", "websiteUrl");
    } else if (websiteUrl.slice(0, 8) !== "https://") {
      message("Please write websiteUrl (https://)", "websiteUrl");
    } else if (websiteUrl.length > 100) {
      message("Write websiteUrl less 100 letters", "websiteUrl");
    } else {
      isWebsiteUrl = websiteUrl;
    }

    if (errorsMessages.length > 0) {
      return [{ errorsMessages: errorsMessages }, false];
    } else {
      const createBlog: BlogViewModel = {
        id: isId,
        name: isName,
        description: isDescription,
        websiteUrl: isWebsiteUrl,
      };
      bd.blogs.push(createBlog);
      return [createBlog, true];
    }
  },
  findBlogById(id: string) {
    let oneBlog = bd.blogs.find((p) => p.id === id);
    return oneBlog;
  },
  updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    let oneBlog = bd.blogs.find((p) => p.id === id);
    if (oneBlog) {
      errorsMessages = [];
      let isName: string = "";
      if (!name) {
        message("Write name", "name");
      } else if (typeof name !== "string") {
        message("Please write string", "name");
      } else if (name.length > 15) {
        message("Write name less 15 letters", "name");
      } else {
        isName = name;
      }

      let isDescription: string = "";
      if (!description) {
        message("Write description", "description");
      } else if (typeof description !== "string") {
        message("Please write string", "description");
      } else if (description.length > 500) {
        message("Write description less 500 letters", "description");
      } else {
        isDescription = description;
      }

      let isWebsiteUrl: string = "";
      if (!websiteUrl) {
        message("Write websiteUrl", "websiteUrl");
      } else if (typeof websiteUrl !== "string") {
        message("Please write websiteUrl like string", "websiteUrl");
      } else if (websiteUrl.slice(0, 8) !== "https://") {
        message("Please write websiteUrl (https://)", "websiteUrl");
      } else if (websiteUrl.length > 100) {
        message("Write websiteUrl less 100 letters", "websiteUrl");
      } else {
        isWebsiteUrl = websiteUrl;
      }

      if (errorsMessages.length > 0) {
        return [400, { errorsMessages: errorsMessages }];
      } else {
        oneBlog.name = isName;
        oneBlog.description = isDescription;
        oneBlog.websiteUrl = isWebsiteUrl;
        return [204];
      }
    } else {
      return [404];
    }
  },
  deleteblogs(id: string) {
    let oneBlog = bd.blogs.find((p) => p.id === id);
    if (oneBlog) {
      bd.blogs = bd.blogs.filter((p) => p.id !== id);
      return [204];
    } else {
      return [404];
    }
  },
};
