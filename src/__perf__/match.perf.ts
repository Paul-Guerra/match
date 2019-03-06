import Match from '../match';
import buildCorpus from './messages';
let messages = buildCorpus(600000, 'KEY WORD');

const match = new Match('id', 'text');
console.log('Begin indexing');
console.time('adding docs to index');
messages.forEach((doc) => match.add(doc));
console.timeEnd('adding docs to index');

// console.log('new Match():', new Match());
// console.log('buildCorpus:', buildCorpus());
