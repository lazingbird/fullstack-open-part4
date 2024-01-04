const listHelper = require("../utils/list_helper");
const blogsData = require("./blogs_data");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has multiple blogs, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogsData);
    expect(result).toBe(36);
  });
});

describe("favorite blog (with most likes)", () => {
  test("when list has no blogs, return nothing", () => {
    const blogs = [];
    expect(listHelper.favoriteBlog(blogs)).toEqual([]);
  });
  test("return blog with most likes", () => {
    expect(listHelper.favoriteBlog(blogsData)).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("get author with most blogs", () => {
  test("return an object containg the author with most blogs and how many", () => {
    expect(listHelper.mostBlogs(blogsData)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("get author with most likes", () => {
  test("return an object containg the author with most likes and how many", () => {
    expect(listHelper.mostLikes(blogsData)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
