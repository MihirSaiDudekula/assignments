const fs = require('fs');

let data = '\nthis is what I want to add to this file';

const prom = new Promise((resolve, reject) => {
    fs.writeFile('example.txt', data, (err) => {
        if (err) {
            reject(err);
            return;
        }
        resolve();
    });
});

prom
    .then(() => {
        console.log('File write operation successful');
    })
    .catch((err) => {
        console.error('Error writing to file:', err);
    });
