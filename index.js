const NewmanConfig = require('./core.js')

var args = process.argv.slice(2);

new NewmanConfig(args[0])
