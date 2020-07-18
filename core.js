const newman = require('newman'); // require newman in your project

class NewmanConfig{

    constructor(root_json_file){
        this.root_json = root_json_file
        console.log(this.root_json)
        this.looprun()
    }

    looprun(){
        var root_file = require(this.root_json)
        var run_list = root_file.runs
        run_list.forEach(parseAndRun);

        function parseAndRun(value, index, array) {
            console.log(value)
            console.log(index)
        }
    }

    run(){
        // call newman.run to pass `options` object and wait for callback
        newman.run({
            collection: require('./collections/file_upload_collection.postman_collection.json'),
            environment: require('./environment/test_environment.json'),
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

    }

}

module.exports = NewmanConfig
