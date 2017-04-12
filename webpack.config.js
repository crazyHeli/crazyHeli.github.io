module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "./bundle/bundle.js"






    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: "source-map", //For debugging. More info here:  https://webpack.github.io/docs/configuration.html#devtool

    module: {
      loaders: [
        {
          loader: "babel-loader?optional[]=runtime",


          test: /\.js?$/,

          // Options to configure babel with
          query: {
            presets: ['es2015']
          }
        },
      ]
    }

}
