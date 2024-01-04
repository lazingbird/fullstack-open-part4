const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentBlog) => accumulator + currentBlog.likes,
    0
  );
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return [];
  }
  const favorite = blogs.reduce((maxBlogs, blog) =>
    maxBlogs.likes > blog.likes ? maxBlogs : blog
  );
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  let countAuthors = {};

  let authorWithMostBlogs = "";
  let maxBlogs = 0;

  blogs.map((blog) => {
    for (let key in blog) {
      if (key === "author") {
        if (blog[key] in countAuthors === false) {
          countAuthors[blog[key]] = 1;
        } else {
          countAuthors[blog[key]] += 1;
        }
      }
    }
  });

  for (key in countAuthors) {
    if (countAuthors[key] > maxBlogs) {
      maxBlogs = countAuthors[key];
      authorWithMostBlogs = key;
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: maxBlogs,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
