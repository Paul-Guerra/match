const buildCorpus = require('./messages');
let messages = buildCorpus(600000, "KEY WORD");
let start;

let results;
results = [];
console.time('searching for docs with "KEY WORD" with .match()');
results = messages.filter(msg => msg.text.match('KEY WORD') !== null).map(msg => msg.id);
console.timeEnd('searching for docs with "KEY WORD" with .match()');
console.log('results', results.length);


results = [];
console.time('searching for docs with "KEY WORD" with .indexOf()');
results = messages.filter(msg => msg.text.indexOf('KEY WORD') > -1).map(msg => msg.id);
console.timeEnd('searching for docs with "KEY WORD" with .indexOf()');
console.log('results', results.length);


console.log("messages: ", messages.length);
