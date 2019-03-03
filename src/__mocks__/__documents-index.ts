import { InvertedIndex, EntryDocInfo } from '../documents-index';
class MockDocumentsIndex implements InvertedIndex {
  
  has(word: string): boolean { return true; }
  
  get(word: string): EntryDocInfo {

  }
  
  add(word: string, docId: string, offset: number): void {

  }  
}

export default MockDocumentsIndex;