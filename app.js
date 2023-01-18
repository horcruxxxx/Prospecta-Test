// task1 -1)	Create an API that lists the title, description based on the category passed as an input parameter.

const express = require('express');
const http = require('http');
const app = express();

app.get('/entries/:category', (req, res) => {
    const category = req.params.category;
    const options = {
        hostname: 'api.publicapis.org',
        port: 80,
        path: `/entries?category=${category}`,
        method: 'GET'
    };
    const request = http.request(options, response => {
        response.setEncoding('utf8');
        let data = '';
        response.on('data', chunk => {
            data += chunk;
        });
        response.on('end', () => {
            const jsonData = JSON.parse(data);
            const filteredEntries = jsonData.entries.map(entry => ({ title: entry.API, description: entry.Description }));
            res.json(filteredEntries);
        });
    });
    request.on('error', err => {
        res.status(500).json({ error: err.message });
    });
    request.end();
});

app.listen(3000, () => {    //we can also host it on any server.
    console.log('API listening on port 3000');
});


//Task - 2)	Create an API that would save a new entry with all the relevant properties which retrieves values from the endpoint GET /entries.

const express = require('express');
const app = express();
const db = require('../models');

// POST request to save new entry
app.post('/entry', (req, res) => {
    // create new entry object with properties from request body
    const newEntry = new db.Entry({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    });

    // saving new entry to the database
    newEntry.save()
        .then(savedEntry => res.json(savedEntry))
        .catch(err => res.status(400).json(err));
});

// GET request to retrieve all entries
app.get('/entries', (req, res) => {
    db.Entry.find()
        .then(entries => res.json(entries))
        .catch(err => res.status(400).json(err));
});



// question 3) 
error handling, authentication and validation, error handling are the import factores that can took into consideration.
we can use google o.auth 2.0 for 3rd party authemtication purpose.


THEORITICAL CHALLENGES:

1:
To tackle the challenge, I would first parse the CSV input to extract the values and formulas. 
Then I would use a library like pandas or openpyxl to read the data and evaluate the formulas. 
The final step would be to write the results to a new CSV file.

2:
I would check for errors such as invalid formulas, missing data, and circular references. 
I would also check for cases where the formula references a cell that does not exist, and for 
cases where the formula is not properly formatted.

3:
A user might break the code by providing a CSV file that is not properly formatted.
such as missing data, or by providing a formula that is not properly formatted. 
Additionally, if the user provides a formula that references a cell that does not exist, this would 
also break the code.
