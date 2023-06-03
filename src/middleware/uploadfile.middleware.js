const util = require('util');
const Multer = require('multer');

const processFile = Multer({
  storage: Multer.memoryStorage(),
}).array('pictures');

const processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
