/* tslint:disable:no-magic-numbers */
import DocumentsIndex from '../documents-index';

describe('DocumentsIndex.add', () => {
  let index: DocumentsIndex;

  beforeEach(() => {
    index = new DocumentsIndex();
  });

  it('can add a word to an empty index', () => {
    index.add('foo', 'abc', 1);
    expect(index.words.foo.abc.offsets.has(1)).toBe(true);
  });

  it('can add a new document to an existing word in the index', () => {
    index.add('foo', 'abc', 2);
    index.add('foo', 'def', 3);
    expect(index.words.foo.abc.offsets.has(2)).toBe(true);
    expect(index.words.foo.def.offsets.has(3)).toBe(true);
    expect(index.words.foo.abc.offsets.size).toEqual(1);
    expect(index.words.foo.def.offsets.size).toEqual(1);
  });

  it('can add a new offset to a repeated word from the same document', () => {
    index.add('foo', 'abc', 4);
    index.add('foo', 'abc', 5);
    expect(index.words.foo.abc.offsets.has(4)).toBe(true);
    expect(index.words.foo.abc.offsets.has(5)).toBe(true);
    expect(index.words.foo.abc.offsets.size).toEqual(2);
  });
});

describe('DocumentsIndex.has', () => {
  let index: DocumentsIndex;

  beforeEach(() => {
    index = new DocumentsIndex();
  });

  it('returns true if a word has been indexed', () => {
    index.add('foo', 'abc', 1);
    expect(index.has('foo')).toBe(true);
  });

  it('returns false if a word has been not indexed', () => {
    expect(index.has('NOT')).toBe(false);
  });
});


describe('DocumentsIndex.get', () => {
  let index: DocumentsIndex;

  beforeEach(() => {
    index = new DocumentsIndex();
  });

  it('returns entry if a word has been indexed', () => {
    index.add('foo', 'abc', 1);
    expect(index.get('foo').abc.offsets.has(1)).toBe(true);
  });

  it('returns false if a word has been not indexed', () => {
    expect(Object.keys(index.get('MISSING')).length).toBe(0);
  });
});

describe('DocumentsIndex.remove', () => {
  let index: DocumentsIndex;

  beforeEach(() => {
    index = new DocumentsIndex();
    index.add('foo', 'doc1', 1);
    index.add('foo', 'doc1', 2);
    index.add('foo', 'doc2', 3);
  });

  it('removes a word from the index', () => {
    index.remove('foo');
    expect(index.has('foo')).toBe(false);
    expect(index.words.foo).toBe(undefined);
  });
});

describe('DocumentsIndex.remove', () => {
  let index: DocumentsIndex;

  beforeEach(() => {
    index = new DocumentsIndex();
    index.add('foo', 'doc1', 1);
    index.add('foo', 'doc1', 2);
    index.add('foo', 'doc2', 3);
  });

  it('removes a word from the index', () => {
    index.remove('foo');
    expect(index.has('foo')).toBe(false);
    expect(index.words.foo).toBe(undefined);
  });
});


describe('DocumentsIndex.removeDocumentData', () => {
  let index: DocumentsIndex;

  beforeEach(() => {
    index = new DocumentsIndex();
    index.add('foo', 'doc1', 1);
    index.add('foo', 'doc1', 2);
    index.add('foo', 'doc2', 3);
  });

  it('removes a document association with a word', () => {
    index.removeDocumentData('foo', 'doc1');
    expect(index.has('foo')).toBe(true);
    expect(index.words.foo).toBeTruthy();
    expect(index.words.foo.doc1).toBeFalsy();
    expect(index.words.foo.doc2).toBeTruthy();
  });

  it('does nothing if the document is not associated with the word', () => {
    index.removeDocumentData('foo', 'DOES_NOT_EXIST');
    expect(index.has('foo')).toBe(true);
    expect(index.words.foo).toBeTruthy();
    expect(index.words.foo.doc1).toBeTruthy();
    expect(index.words.foo.doc2).toBeTruthy();
  });

  it('removes the word from the index if no documents are associated with it anymore', () => {
    index.removeDocumentData('foo', 'doc1');
    index.removeDocumentData('foo', 'doc2');
    expect(index.has('foo')).toBe(false);
  });
});
