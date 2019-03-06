export interface Entry {
  [word: string] : Set<string>;
}

// export interface EntryDocInfo {
//   [doc: string] : {
//     offsets: Set<number>
//   };
// }


class DocumentsIndex {

  words: Entry;
  
  constructor() {
    this.words  = {};
  }

  /**
   * @description Returns true if word is indexed, false if it is absent
   * @param {string} word - Word to test
   */
  has(word: string): boolean {
    return !!this.words[word];
  }

  /**
   * @description Returns index data for a word. If word is not indexed it returns false
   * @param {string} word - Word to query
   */
  get(word: string): Set<string> {
    return this.words[word] || new Set();
  }

  /**
   * @description Returns the words in the index that match the given pattern
   * @param pattern RegEx pattern to match
   */
  getWordsMatching(pattern: RegExp): RegExpMatchArray | null {
    const allTheWords = Object.keys(this.words).join('\n');
    return allTheWords.match(pattern);
  }

  /**
   * @description Creates an index for a word with associated data
   * @param {string} word - Word to be indexed
   * @param {string} docId - Id of the document
   * @returns {object} The indexed data for the word
   */
  add(word: string, docId: string, offset: number): void {
    if (!this.words[word]) {
      this.words[word] = new Set();
    }
    this.words[word].add(docId);
  }

  /**
   * @description Removes the document data assciated with a word
   * @param {string} word - Word that is associated with the document
   * @param {string} docId - Id of document to be removed
   */
  removeDocumentData(word: string, docId: string) {
    this.words[word].delete(docId);
    if (this.words[word].size === 0) this.remove(word);
  }

  /**
   * @description Removes a word from the index
   * @param {string} word - Word to be removed
   */
  remove(word: string) {
    delete this.words[word];
  }
}

export default DocumentsIndex;