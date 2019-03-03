interface Entry {
  [word: string] : EntryDocInfo;
}
interface EntryDocInfo {
  [doc: string] : {
    offsets: Set<number>
  };
}

class InvertedIndex {

  words: Entry;
  
  constructor() {
    this.words  = {};
  }

  /**
   * @description Returns true if word is indexed, false if it is absent
   * @param {string} word - Word to test
   */
  has(word: string) {
    return !!this.words[word];
  }

  /**
   * @description Returns index data for a word. If word is not indexed it returns false
   * @param {string} word - Word to query
   */
  get(word: string): EntryDocInfo {
    return this.words[word] || {};
  }

  /**
   * @description Creates an index for a word with associated data
   * @param {string} word - Word to be indexed
   * @param {string} docId - Id of the document
   * @param {number} offset - The words relative order in the document
   * @returns {object} The indexed data for the word
   */
  add(word: string, docId: string, offset: number): void {
    if (!this.words[word]) {
      this.words[word] = { [docId]: { offsets: new Set([offset]) } };
      return;
    }
    if (!this.words[word][docId]) {
      this.words[word][docId] = { offsets: new Set([offset]) };
      return;
    }
    this.words[word][docId].offsets.add(offset);
  }

  /**
   * @description Removes the document data assciated with a word
   * @param {string} word - Word that is associated with the document
   * @param {string} docId - Id of document to be removed
   */
  removeDocumentData(word: string, docId: string) {
    if (!this.words[word][docId]) return;
    delete this.words[word][docId];
    if (Object.keys(this.words[word]).length === 0) this.remove(word);
    return;
  }

  /**
   * @description Removes a word from the index
   * @param {string} word - Word to be removed
   */
  remove(word: string) {
    delete this.words[word];
  }
}

export default InvertedIndex;