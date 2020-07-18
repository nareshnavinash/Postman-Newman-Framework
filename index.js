const newman = require('newman'); // require newman in your project
 
// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./collections/file_upload_collection.json'),
    reporters: ['cli', 'json', 'html', 'allure'],
    reporter: {
        html: {
            export: './reports/htmlResults.html' // If not specified, the file will be written to `newman/` in the current working directory.
        },
        allure: {
            export: './reports/allure'
        }
    }
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});
