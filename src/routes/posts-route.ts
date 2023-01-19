import { Router } from "express";

export const postsRouter = Router({});


postsRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json(bd.posts);
  });
  
  postsRouter.post("/", (req: Request<{}, {}, PostInputModel>, res: Response) => {
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
    if (!req.body.title) {
      message("Write title", "title");
    } else if (typeof req.body.title !== "string") {
      message("Please write string", "title");
    } else if (req.body.title.length > 30) {
      message("Write title less 30 letters", "title");
    } else {
      isTitle = req.body.title;
    }
  
    let isShortDescription: string = "";
    if (!req.body.shortDescription) {
      message("Write shortDescription", "shortDescription");
    } else if (typeof req.body.shortDescription !== "string") {
      message("Please write string", "shortDescription");
    } else if (req.body.shortDescription.length > 100) {
      message("Write shortDescription less 100 letters", "shortDescription");
    } else {
      isShortDescription = req.body.shortDescription;
    }
  
    let isContent: string = "";
    if (!req.body.content) {
      message("Write content", "content");
    } else if (typeof req.body.content !== "string") {
      message("Please write content like string", "content");
    } else if (req.body.content.length > 1000) {
      message("Write content less 1000 letters", "content");
    } else {
      isContent = req.body.content;
    }
    let g: boolean = false;
    let isBlogName: string = "";
  
    for (let aa = 0; aa < bd.blogs.length; aa++) {
      if (req.body.blogId === bd.blogs[aa].id) {
        g = true;
        isBlogName = bd.blogs[aa].name;
        break;
      }
    }
  
    let isBlogId: string = "";
    if (!req.body.blogId) {
      message("Write blogId", "blogId");
    } else if (typeof req.body.blogId !== "string") {
      message("Please write blogId like string", "blogId");
    } else if (g === false) {
      message("Please insert existed user id", "blogId");
    } else {
      isBlogId = req.body.blogId;
    }
  
    if (errorsMessages.length > 0) {
      res.status(400).json({ errorsMessages: errorsMessages });
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
      res.status(201).json(createPost);
    }
  });
  
  postsRouter.get("/:id", (req: Request, res: Response) => {
    let id: string = req.params.id;
    let onePost = bd.posts.find((p) => p.id === id);
    if (onePost) {
      res.status(200).json(onePost);
    } else {
      res.send(404);
    }
  });
  
  postsRouter.put(
    "/:id",
    (req: Request<{ id: string }, {}, PostInputModel>, res: Response) => {
      let id: string = req.params.id;
      let onePost = bd.posts.find((p) => p.id === id);
      if (onePost) {
        errorsMessages = [];
  
        let isTitle: string = "";
        if (!req.body.title) {
          message("Write title", "title");
        } else if (typeof req.body.title !== "string") {
          message("Please write string", "title");
        } else if (req.body.title.length > 30) {
          message("Write title less 30 letters", "title");
        } else {
          isTitle = req.body.title;
        }
  
        let isShortDescription: string = "";
        if (!req.body.shortDescription) {
          message("Write shortDescription", "shortDescription");
        } else if (typeof req.body.shortDescription !== "string") {
          message("Please write string", "shortDescription");
        } else if (req.body.shortDescription.length > 100) {
          message("Write shortDescription less 100 letters", "shortDescription");
        } else {
          isShortDescription = req.body.shortDescription;
        }
  
        let isContent: string = "";
        if (!req.body.content) {
          message("Write content", "content");
        } else if (typeof req.body.content !== "string") {
          message("Please write content like string", "content");
        } else if (req.body.content.length > 1000) {
          message("Write content less 1000 letters", "content");
        } else {
          isContent = req.body.content;
        }
        let g: boolean = false;
        let isBlogName: string = "";
  
        for (let aa = 0; aa < bd.blogs.length; aa++) {
          if (req.body.blogId === bd.blogs[aa].id) {
            g = true;
            isBlogName = bd.blogs[aa].name;
            break;
          }
        }
  
        let isBlogId: string = "";
        if (!req.body.blogId) {
          message("Write blogId", "blogId");
        } else if (typeof req.body.blogId !== "string") {
          message("Please write blogId like string", "blogId");
        } else if (g === false) {
          message("Please insert existed user id", "blogId");
        } else {
          isBlogId = req.body.blogId;
        }
  
        if (errorsMessages.length > 0) {
          res.status(400).json({ errorsMessages: errorsMessages });
        } else {
          (onePost.title = isTitle),
            (onePost.shortDescription = isShortDescription),
            (onePost.content = isContent),
            (onePost.blogId = isBlogId),
            (onePost.blogName = isBlogName),
            res.send(204);
        }
      } else {
        res.send(404);
      }
    }
  );
  
  postsRouter.delete("/:id", (req: Request, res: Response) => {
    let id: string = req.params.id;
    let onePost = bd.posts.find((p) => p.id === id);
    if (onePost) {
      bd.posts = bd.posts.filter((p) => p.id !== id);
      res.send(204);
    } else {
      res.send(404);
    }
  });
  