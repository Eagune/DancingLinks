module.exports = {
  mode: 'production',
  entry: __dirname + '/src/DancingLinks.ts',
  output: {
    path: __dirname + '/dist/bundles',
    filename: 'DancingLinks.umd.js',
    libraryTarget: 'umd',
    library: 'DancingLinks',
    libraryExport: "default",
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            module: 'es2015',
            declaration: false,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};