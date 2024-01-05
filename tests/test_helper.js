const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Blog 1",
    author: "João Smith",
    url: "google.com.br",
    likes: 50,
  },
  {
    title: "Blog 2",
    author: "Joana Smith",
    url: "google.com.br",
    likes: 80,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "remove smith",
    url: "remove.remove",
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
