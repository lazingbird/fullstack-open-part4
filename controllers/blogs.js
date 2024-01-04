const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", (request, response) => {
  logger.info("working");
  Blog.find({}).then((blogs) => response.json(blogs));
});

blogRouter.post("/", (request, response, next) => {
  logger.info(request.body);
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
