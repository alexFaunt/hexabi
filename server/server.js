// Imports
import express from 'express';
import fs from 'fs';
import path from 'path';

// Caches
const htmlCache = {};

// Function defs
function createApp() {return express();}

function run() {

    // Create app
    const app = createApp();

    // Static
    app.use('/static', express.static(path.join(__dirname, '../static')));

    // Routing
    app.get('/', (req, res) => {

        // Serve from cache if possible
        if (!!htmlCache.index) {return res.send(htmlCache.index);}

        // Read from file if not
        fs.readFile(path.join(__dirname, '../index.html'), {encoding: 'utf-8'}, (err, html) => {
            htmlCache.index = html;
            return res.send(html);
        });
    });

    // Listen
    app.listen(8080);

}

// Run
if (require.main === module) {
    run();
}
