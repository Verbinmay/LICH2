import express, { NextFunction, Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

type ApiErrorResult = Array<FieldError>;
type FieldError = {
  message: string;
  field: string;
};
type BlogInputModel = {
  name: string;
  description: string;
  websiteUrl: string;
};
type BlogViewModel = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
};
type PostInputModel = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
};
type PostViewModel = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
};

let bd: { blogs: BlogViewModel[]; post: PostViewModel[] } = {
  blogs: [],
  post: [],
};

let errorsMessages: ApiErrorResult = [];
function message(a: string, b: string) {
  errorsMessages.push({
    message: a,
    field: b,
  });
}

app.get("/blogs", (req: Request, res: Response) => {
  res.status(200).json(bd.blogs);
});

app.post("/blogs", (req: Request<{}, {}, BlogInputModel>, res: Response) => {
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
  if (!req.body.name) {
    message("Write name", "name");
  } else if (typeof req.body.name !== "string") {
    message("Please write string", "name");
  } else if (req.body.name.length > 15) {
    message("Write name less 15 letters", "name");
  } else {
    isName = req.body.name;
  }

  let isDescription: string = "";
  if (!req.body.description) {
    message("Write description", "description");
  } else if (typeof req.body.description !== "string") {
    message("Please write string", "description");
  } else if (req.body.description.length > 500) {
    message("Write description less 500 letters", "description");
  } else {
    isDescription = req.body.description;
  }

  let isWebsiteUrl: string = "";
  if (!req.body.websiteUrl) {
    message("Write websiteUrl", "websiteUrl");
  } else if (typeof req.body.websiteUrl !== "string") {
    message("Please write websiteUrl like string", "websiteUrl");
  } else if (req.body.websiteUrl.slice(0, 8) !== "https://") {
    message("Please write websiteUrl (https://)", "websiteUrl");
  } else if (req.body.websiteUrl.length > 100) {
    message("Write websiteUrl less 100 letters", "websiteUrl");
  } else {
    isWebsiteUrl = req.body.websiteUrl;
  }

  if (errorsMessages.length > 0) {
    res.status(400).json({ errorsMessages: errorsMessages });
  } else {
    const createBlog: BlogViewModel = {
      id: isId,
      name: isName,
      description: isDescription,
      websiteUrl: isWebsiteUrl,
    };
    bd.blogs.push(createBlog);
    res.status(201).json(createBlog);
  }
});

app.get("/blogs/:id", (req: Request, res: Response) => {
  let id: string = req.params.id;
  let oneBlog = bd.blogs.find((p) => p.id === id);
  if (oneBlog) {
    res.status(200).json(oneBlog);
  } else {
    res.send(404);
  }
});

app.put(
  "/blogs/:id",
  (req: Request<{ id: string }, {}, BlogInputModel>, res: Response) => {
    let id: string = req.params.id;
    let oneBlog = bd.blogs.find((p) => p.id === id);
    if (oneBlog) {
      errorsMessages = [];
      let isName: string = "";
      if (!req.body.name) {
        message("Write name", "name");
      } else if (typeof req.body.name !== "string") {
        message("Please write string", "name");
      } else if (req.body.name.length > 15) {
        message("Write name less 15 letters", "name");
      } else {
        isName = req.body.name;
      }

      let isDescription: string = "";
      if (!req.body.description) {
        message("Write description", "description");
      } else if (typeof req.body.description !== "string") {
        message("Please write string", "description");
      } else if (req.body.description.length > 500) {
        message("Write description less 500 letters", "description");
      } else {
        isDescription = req.body.description;
      }

      let isWebsiteUrl: string = "";
      if (!req.body.websiteUrl) {
        message("Write websiteUrl", "websiteUrl");
      } else if (typeof req.body.websiteUrl !== "string") {
        message("Please write websiteUrl like string", "websiteUrl");
      } else if (req.body.websiteUrl.slice(0, 8) !== "https://") {
        message("Please write websiteUrl (https://)", "websiteUrl");
      } else if (req.body.websiteUrl.length > 100) {
        message("Write websiteUrl less 100 letters", "websiteUrl");
      } else {
        isWebsiteUrl = req.body.websiteUrl;
      }

      if (errorsMessages.length > 0) {
        res.status(400).json({ errorsMessages: errorsMessages });
      } else {
        oneBlog.name = isName;
        oneBlog.description = isDescription;
        oneBlog.websiteUrl = isWebsiteUrl;
        res.send(204);
      }
    } else {
      res.send(404);
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
