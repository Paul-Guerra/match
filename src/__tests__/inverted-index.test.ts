/* tslint:disable:no-magic-numbers */

import InvertedIndex from '../inverted-index';

describe('InvertedIndex.addWordFromDoc', () => {
  let index: InvertedIndex;

  beforeEach(() => {
    index = new InvertedIndex();
  });

  it('can add a word to an empty index', () => {
    index.addWordFromDoc('foo', 'abc', 1);
    expect(index.index.foo.abc.offsets.has(1)).toBe(true);
  });

  it('can add a new document to an existing word in the index', () => {
    index.addWordFromDoc('foo', 'abc', 2);
    index.addWordFromDoc('foo', 'def', 3);
    expect(index.index.foo.abc.offsets.has(2)).toBe(true);
    expect(index.index.foo.def.offsets.has(3)).toBe(true);
    expect(index.index.foo.abc.offsets.size).toEqual(1);
    expect(index.index.foo.def.offsets.size).toEqual(1);
  });

  it('can add a new offset to a repeated word from the same document', () => {
    index.addWordFromDoc('foo', 'abc', 4);
    index.addWordFromDoc('foo', 'abc', 5);
    expect(index.index.foo.abc.offsets.has(4)).toBe(true);
    expect(index.index.foo.abc.offsets.has(5)).toBe(true);
    expect(index.index.foo.abc.offsets.size).toEqual(2);
  });
});

describe('InvertedIndex.has', () => {
  let index: InvertedIndex;

  beforeEach(() => {
    index = new InvertedIndex();
  });

  it('returns true if a word has been indexed', () => {
    index.addWordFromDoc('foo', 'abc', 1);
    expect(index.has('foo')).toBe(true);
  });

  it('returns false if a word has been not indexed', () => {
    expect(index.has('NOT')).toBe(false);
  });
});


describe('InvertedIndex.get', () => {
  let index: InvertedIndex;

  beforeEach(() => {
    index = new InvertedIndex();
  });

  it('returns entry if a word has been indexed', () => {
    index.addWordFromDoc('foo', 'abc', 1);
    expect(index.get('foo').abc.offsets.has(1)).toBe(true);
  });

  it('returns false if a word has been not indexed', () => {
    expect(Object.keys(index.get('MISSING')).length).toBe(0);
  });
});

// describe('InvertedIndex.remove', () => {
//   let index: InvertedIndex;

//   beforeEach(() => {
//     index = new InvertedIndex();
//     index.addWordFromDoc('foo', 'abc', 1);
//     index.addWordFromDoc('foo', 'abc', 2);
//     index.addWordFromDoc('foo', 'def', 3);
//   });

//   it('can remove a word to an empty index', () => {
//     index.removeDocument('foo', 'abc');
//     expect(index.index.foo.abc.offsets.has(1)).toBe(true);
//   });
// });