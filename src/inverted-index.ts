interface Entry {
  [word: string] : {
    [doc: string] : {
      offsets: Set<number>
    }
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
  // has(word: string) {
  //   return !!this.index[word];
  // }

  /**
   * @description Returns index data for a word. If word is not indexed it returns false
   * @param {string} word - Word to query
   */
  // get(word: string) {
  //   return this.has(word) ? this.index[word].ids : new Set();
  // }

  /**
   * @description Creates an index for a word with associated data
   * @param {string} word - Word to be indexed
   * @param {string} docId - Id of the document
   * @param {number} order - The words relative order in the document
   * @returns {object} The indexed data for the word
   */
  add(word: string, docId: string, order: number) {
    this.index[word] = { [docId]: { offsets: new Set([order]) } };
    return this.index[word];
  }

  /**
   * @description For an existing word in the index, inserts new postion data and adds document if needed
   * @param {string} word  - Word to be updated in the index
   * @param {string} docId -  Id of the document
   * @param {number} order The words relative order in the document
   * @param {string} next - The next word in the document
   * @returns {object} The indexed data for the word
   */
  // update(word, docId, order, next) {
  //   let docData;
  //   this.index[word].ids.add(docId);

  //   docData = this.index[word][docId];
  //   if (docData) {
  //     if (typeof docData[order] === 'object') {
  //       console.warn('[Index.update] updating a word position in a document when position already exists. Returning existing data');
  //       return this.index[word];
  //     }
  //     docData[order] = true;
  //   } else {
  //     docData = {
  //       [order]: true
  //     };
  //   }

  //   return this.index[word];
  // }

  /**
   * @description Removes the document data assciated with a word
   * @param {string} word - Word that is associated with the document
   * @param {string} docId - Document to be removed
   * @returns {number} The updated document count for the word
   */
  // removeDocument(word, docId) {
  //   let docCount;
  //   if (!this.index[word][docId]) {
  //     return Object.keys(this.index[word]).length;
  //   }
  //   delete this.index[word][docId];
  //   docCount = Object.keys(this.index[word]).length;
  //   if (docCount === 0) this.remove(word);
  //   return docCount;
  // }

  /**
   * @description Removes a word from the index
   * @param {string} word - Word to be removed
   */
  // remove(word) {
  //   delete this.index[word];
  // }
}

export default InvertedIndex;