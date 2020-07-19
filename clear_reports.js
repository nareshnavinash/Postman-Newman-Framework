const fs = require('fs');
const path = require('path');

function removeDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
            if (file != '.keep') {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        }
    });
}

removeDirectory('./reports/allure/')
removeDirectory('./reports/html/')
removeDirectory('./reports/json/')
