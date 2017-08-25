const webpack = require('webpack');
const path = require('path');

const multiCompiler = webpack([
  {
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  },
  {
    entry: './index.js',
    output: {
      filename: 'bundle2.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
]);

multiCompiler.plugin('watch-run', function(watching, cb) {
  console.log('multiCompiler watch-run'); // don't print
  cb();
});

multiCompiler.compilers[0].plugin('watch-run', function(watching, cb) {
  console.log('compilers[0] watch-run'); // print
  cb();
});

const watcher = multiCompiler.watch({}, (err, stats) => {
  console.log('Rebuild complete ' + new Date().toLocaleString()); //print
});
