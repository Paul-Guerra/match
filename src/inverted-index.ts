interface Entry {
  [word: string] : EntryDocInfo;
}
interface EntryDocInfo {
  [doc: string] : {
    offsets: Set<number>
  };
}

class InvertedIndex {

  index: Entry;
  constructor() {
    this.index  = {};
  }

  /**
   * @description Returns true if word is indexed, false if it is absent
   * @param {string} word - Word to test
   */
  has(word: string) {
    return !!this.index[word];
  }

  /**
   * @description Returns index data for a word. If word is not indexed it returns false
   * @param {string} word - Word to query
   */
  get(word: string): EntryDocInfo {
    if (this.has(word)) return this.index[word];
    return {};
  }

  /**
   * @description Creates an index for a word with associated data
   * @param {string} word - Word to be indexed
   * @param {string} docId - Id of the document
   * @param {number} order - The words relative order in the document
   * @returns {object} The indexed data for the word
   */
  addWordFromDoc(word: string, docId: string, order: number): void {
    if (!this.index[word]) {
      this.index[word] = { [docId]: { offsets: new Set([order]) } };
      return;
    }
    if (!this.index[word][docId]) {
      this.index[word][docId] = { offsets: new Set([order]) };
      return;
    }
    this.index[word][docId].offsets.add(order);
  }

  /**
   * @description Removes the document data assciated with a word
   * @param {string} word - Word that is associated with the document
   * @param {string} docId - Document to be removed
   * @returns {number} The updated document count for the word
   */
  removeDocument(word: string, docId: string) {
    let docCount;
    if (!this.index[word][docId]) {
      return Object.keys(this.index[word]).length;
    }
    delete this.index[word][docId];
    docCount = Object.keys(this.index[word]).length;
    if (docCount === 0) this.remove(word);
    return docCount;
  }

  /**
   * @description Removes a word from the index
   * @param {string} word - Word to be removed
   */
  remove(word: string) {
    delete this.index[word];
  }
}

export default InvertedIndex;