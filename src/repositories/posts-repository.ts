import { bd } from "../bd";
import { ApiErrorResult, PostViewModel } from "../types";
import { blogsRepository } from "./blogs-repository";

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
    let isBlogName: string = "";
    let aabb = blogsRepository.findBlogById(blogId)?.name;
    if (aabb !== undefined) {
      isBlogName = aabb;
    }
    const createPost: PostViewModel = {
      id: isId,
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blogId,
      blogName: isBlogName,
    };
    bd.posts.push(createPost);
    return createPost;
  },

  findPostById(id: string) {
    let onePost = bd.posts.find((p) => p.id === id);
    return onePost;
  },
  updatePost(
    bbcc: PostViewModel,
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ) {
    let isBlogName: string = "";
    let aabb = blogsRepository.findBlogById(blogId)?.name;
    if (aabb !== undefined) {
      isBlogName = aabb;
    }
    bbcc.title = title;
    bbcc.shortDescription = shortDescription;
    bbcc.content = content;
    bbcc.blogId = blogId;
    bbcc.blogName = isBlogName;
    
  },
  deletePost(id: string) {
    let onePost = bd.posts.find((p) => p.id === id);
    if (onePost!==undefined) {
      bd.posts = bd.posts.filter((p) => p.id !== id);
      return [204];
    } else {
      return [404];
    }
  },
};
