import DocumentsIndex from './inverted-index';

class Match {
  index: DocumentsIndex = new DocumentsIndex();
  idProp: string = '';
  textProp: string = '';

  constructor(id: string, text: string)  {
    if (id) this.setIdProp(id);
    if (text) this.setTextProp(text);
  }

  setIdProp(field: string) {
    this.idProp = field;
  }

  setTextProp(field: string) {
    this.textProp = field;
  }

  find(query: string) {}

  add(doc: any) {
    const words = getWords(doc[this.textProp]);
    words.forEach( w => this.index.add(w.text, doc[this.idProp], w.offset));
  }
}

const wordPattern: RegExp = /\S+/igm;

interface ParsedWord {
  text: string;
  offset: number;
}

export function getWords(text: string): ParsedWord[] {
  if (typeof text !== 'string') return [];
  const words: ParsedWord[] = [];
  let word = wordPattern.exec(text);
  while (word) {
    words.push({
      text: word[0],
      offset: word.index
    });
    word = wordPattern.exec(text);
  }

  return words;
}

export default Match;