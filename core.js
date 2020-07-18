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
            console.log(value.collection)
            console.log(value.environment)
            if (value.environment == undefined) {
                NewmanConfig.runCollection(value.collection)
            } else {
                NewmanConfig.runCollectionWithEnv(value.collection, value.environment)
            }
        }
    }

    static runCollectionWithEnv(collection, environment){
        // call newman.run to pass `options` object and wait for callback
        var file_name = collection.split("/")
        newman.run({
            collection: require(collection),
            environment: require(environment),
            reporters: ['cli', 'json', 'html', 'allure'],
            reporter: {
                html: {
                    export: './reports/'.concat(file_name[file_name.length - 1]).concat('.html') // If not specified, the file will be written to `newman/` in the current working directory.
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

    static runCollection(collection){
        // call newman.run to pass `options` object and wait for callback
        var file_name = collection.split("/")
        newman.run({
            collection: require(collection),
            reporters: ['cli', 'json', 'html', 'allure'],
            reporter: {
                html: {
                    export: './reports/'.concat(file_name[file_name.length - 1]).concat('.html') // If not specified, the file will be written to `newman/` in the current working directory.
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
