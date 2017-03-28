
module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    filename: "./dist/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["es2015", "react"]
        }
      }
    ]
  }
};
