const argv = require('yargs').argv;
const path = '../sbxs/';

// Get credentials
const sbx = argv['sbx'];
const credPath = path + sbx + '.json';

try
{
  var creds = require(credPath);
}
catch (e)
{
  throw 'sbxs/ does not have file ' + credPath;
}

module.exports = creds;
