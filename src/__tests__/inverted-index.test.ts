import InvertedIndex from '../inverted-index';

describe('InvertedIndex', () => {
  let index: InvertedIndex;

  beforeEach(() => {
    index = new InvertedIndex();
  });

  it('can add a new word', () => {
    index.add('foo', 'abc', 3);
    expect(index.index.foo.abc.offsets.has(3)).toBe(true);
  });
});