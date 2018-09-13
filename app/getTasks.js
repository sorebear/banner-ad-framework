let fs = require('fs');

/**
 * Load gulp tasks from /tasks onto main gulp object, passing arguments.
 * If a more general "require directory" sort of ability is required
 * use https://github.com/aseemk/requireDir.
 */
module.exports = function() {
  let taskDir = '/tasks';
  let tasks = fs.readdirSync(__dirname + taskDir);
  let args = arguments;

  tasks.map(file => {
    let path = './' + taskDir + '/' + file;

    // pass through arguments passed to getTasks
    require(path).apply(this, args);
  });
};
