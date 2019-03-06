import DocumentsIndex from './documents-index';

class Match {
  index: DocumentsIndex = new DocumentsIndex();
  idProp: string = '';
  textProp: string = '';

  /**
   * 
   * @param id Name of property that represents the id n documents to be indexed
   * @param text Name of property that contains the text in documents to be indexed
   */
  constructor(id?: string, text?: string)  {
    if (id) this.setIdProp(id);
    if (text) this.setTextProp(text);
  }

  /**
   * @description Defines the name of the id property in documents to be indexed
   * @param field Name of property that represents the id
   */
  setIdProp(field: string) {
    this.idProp = field;
  }

  /**
   * @description Defines the name of the property containing the text in documents to be indexed
   * @param field Name of property that contains the text
   */
  setTextProp(field: string) {
    this.textProp = field;
  }

  find(query: string) {
    // let docIds = new Set<string>();
    // const words = getQueryWords(query);

    // if (words.length === 1) return this.getIndexWordsMatching(words[0]);
    // switch (words.length) {
    //   case 1:
    //     docIds = this.getIndexWordsMatching(words[0]);
    //     break;
    //   case 2:
    //     docIds = this.getIndexWordsMatching(words[0]);
    //     break;
    //   default:
    //     docIds = this.getIndexWordsMatching(words[0]);
    //     break;
    // }
  }

  /**
   * @description Looks for all the words in the query but does not match their order.
   * @param query String to search for
   */
  findWithoutOrder(query: string): Set<string> {
    const words = getQueryWords(query.trim());
    let results: Set<string> = new Set();
    let documentIds: string[] = [];
    for (let i = 0; i < words.length; i += 1) {
      let wordsWithMatch: RegExpMatchArray | null;
      wordsWithMatch = this.index.getWordsMatching(new RegExp(`^${words[i]}$`, 'igm'));
      if (!wordsWithMatch) return new Set();
      wordsWithMatch.forEach(match => 
        documentIds = documentIds.concat(
          Object.keys(this.index.get(match))
        )
      );
      const documents = new Set(documentIds);
      if (i === 0) {
        results = documents;
      } else {
        results = getIntersection(results, documents);
      }
    }
    return results;
  }

  /**
   * @description Adds a document to the index and makes it searchable.
   * @param doc Document to be indexed
   */
  add(doc: any) {
    if (!this.idProp) throw new Error('id property not set. Try using setIdProp()');
    if (!this.textProp) throw new Error('text property not set. Try using setTextProp()');
    const words = getDocumentWords(doc[this.textProp]);
    words.forEach( w => this.index.add(w.text, doc[this.idProp], w.offset));
  }
}

/**
 * @description Returns the intersection of two Sets
 * @param {Set} A 
 * @param {Set} B 
 */
function getIntersection(A: Set<string>, B: Set<string>) {
  let smaller: Set<string>;
  let larger: Set<string>;
  // always loop through the smaller set
  if (A.size <= B.size) {
    smaller = A;
    larger = B;
  } else {
    smaller = B;
    larger = A;
  }

  return new Set(
    Array.from(smaller.values()).filter(x => larger.has(x))
  );

}

const wordPattern: RegExp = /\S+/igm;

interface ParsedWord {
  text: string;
  offset: number;
}

/**
 * @description Returns an array of position data about words (consecutive non-whitespace chars) in the text
 * @param text Text to be parsed
 */
export function getDocumentWords(text: string): ParsedWord[] {
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


/**
 * @description Returns an array of words in the query
 * @param text Text to be parsed
 */
export function getQueryWords(text: string): string[] {
  if (typeof text !== 'string') return [];
  return text.toLowerCase().split(/\s+/);
}

export default Match;