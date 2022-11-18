const path = require("path");
const webpack = require("webpack");

const environment = process.env.ENVIRONMENT;

console.log("environment:::::", environment);

let ENVIRONMENT_VARIABLES = {
  "process.env.NODE_ENV": JSON.stringify("development"),
  "process.env.PORT": JSON.stringify("5000"),
  "process.env.MONGO_URI": JSON.stringify("mongodb://mongo-db:27017"),
  "process.env.JWT_SECRET": JSON.stringify("abc123"),
};

if (environment === "test") {
  ENVIRONMENT_VARIABLES = {
    "process.env.NODE_ENV": JSON.stringify("development"),
    "process.env.PORT": JSON.stringify("5000"),
    "process.env.MONGO_URI": JSON.stringify(
      "mongodb+srv://hang-ma-dich-xuyen:wmSuzy2o8bgZdz9Q@cluster0.e27lxes.mongodb.net/test"
    ),
    "process.env.JWT_SECRET": JSON.stringify("abc123"),
  };
} else if (environment === "production") {
  ENVIRONMENT_VARIABLES = {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env.PORT": JSON.stringify("5000"),
    "process.env.MONGO_URI": JSON.stringify(
      "mongodb+srv://hang-ma-dich-xuyen:wmSuzy2o8bgZdz9Q@cluster0.e27lxes.mongodb.net/test"
    ),
    "process.env.JWT_SECRET": JSON.stringify("abc123"),
  };
}

module.exports = {
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "api.bundle.js",
  },
  target: "node",
  plugins: [new webpack.DefinePlugin(ENVIRONMENT_VARIABLES)],
};
