const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((response) => response.title);
    expect(titles).toContain("Blog 2");
  });
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];
    console.log(blogToView.id);

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });

  test("fails with statuscode 404 if blog does not exist", async () => {
    const invalidId = "6596d843392b3a980a55b12b";

    await api.get(`/api/blogs/${invalidId}`).expect(404);
  });
});

test("check if blogs unique identifer is named id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

describe("test creating and deleting blogs works", () => {
  test("check if creating a new blog post works", async () => {
    const initialLength = await Blog.countDocuments();
    const newBlog = {
      title: "Test Request",
      author: "Tester Jones",
      url: "google.com.br",
    };

    await api.post("/api/blogs").send(newBlog);

    expect(await Blog.countDocuments()).toBeGreaterThan(initialLength);
  });

  test("delete a blog", async () => {
    const blogs = await Blog.find({});
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
