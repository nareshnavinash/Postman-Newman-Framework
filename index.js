const NewmanConfig = require('./core.js')

if (process.argv.length <= 2) {
    console.log("Give a feed file to proces and run the tests")
} else {
    var args = process.argv.slice(2);
    new NewmanConfig(args[0])
}
