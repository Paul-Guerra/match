/* tslint:disable:no-magic-numbers */
import Match from '../match';
import buildCorpus from './messages';
let messages = buildCorpus(600000, 'KEY WORD');

const match = new Match('id', 'text');
console.log('Begin indexing');
console.time('adding docs to index');
messages.forEach((doc) => match.add(doc));
console.timeEnd('adding docs to index');


console.time('searching for docs with "KEY WORD"');
let results = match.findWithoutOrder('KEY WORD');
console.timeEnd('searching for docs with "KEY WORD"');
console.log('results', results.size);

