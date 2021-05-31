/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov');
const fs = require('fs');
const axios = require('axios');
// const regex = new RegExp('^(http|https)://');
let type = process.argv[2];
let input = process.argv[3];
// let text = '';

function makeText(input) {
    return console.log(new MarkovMachine(input).makeText());
}

if (type === 'url') {
        response = axios.get(input)
        .then((response) => {
            if(response.status === 200) {
                // console.log(new MarkovMachine(response.data).makeText());
                makeText(response.data);
                process.exit(0);
            }
        })
        .catch((err) => {
            if(err.response){
                console.log('Error: Request failed with status ', err.response.status, err.response.statusText);
            } else {
                console.log('Error: could not find ', input);
            }
            process.exit(1);
        });
} 
if (type === 'file') {
    fs.readFile(input, 'utf8', (err, data) => {
        if(err) {
            console.log('Error reading file:', input);
            process.exit(1);
        }
        makeText(data);
        process.exit(0);
    })
}