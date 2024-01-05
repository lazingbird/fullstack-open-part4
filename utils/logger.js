const info = (...params) => {
  if (process.env.NODE_ENV !== "tfest") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "tfest") {
    console.error(...params);
  }
};

module.exports = {
  info,
  error,
};
