/* tslint:disable:no-magic-numbers */
import Match from '../match';

describe('Match.add', () => {
  let match: Match;

  beforeEach(() => {
    match = new Match('id', 'text');
    jest.spyOn(match.index, 'add');
  });

  it('adds each word to the index', () => {
    match.add({
      id: '123',
      text: 'foo bar baz'
    });

    expect(match.index.add).toHaveBeenCalledTimes(3);
  });

  it('throws error if id field is not defined', () => {
    match = new Match('', 'text');
    const noIdProp = () => {
      match.add({
        id: '123',
        text: 'foo bar baz'
      });
    };
    expect(noIdProp).toThrow('id property not set. Try using setIdProp()');
  });

  it('throws error if text field is not defined', () => {
    match = new Match('id', '');
    const badTextProp = () => {
      match.add({
        id: '123',
        text: 'foo bar baz'
      });
    };
    expect(badTextProp).toThrow('text property not set. Try using setTextProp()');
  });

});


describe('Match.find', () => {
  let match: Match;

  beforeEach(() => {
    match = new Match('id', 'text');

    match.add({
      id: '123',
      text: 'foo bar baz'
    });
    match.add({
      id: '456',
      text: 'abc def ghi'
    });

    match.add({
      id: '789',
      text: 'jkl mno pqr COMMON PHRASE'
    });

    match.add({
      id: '012',
      text: 'stu vwx yz COMMON PHRASE'
    });

  });

  it('finds documents that match all the words query', () => {
    const results = match.findWithoutOrder('bar baz');
    expect(results.has('123')).toBe(true);
    expect(results.size).toBe(1);
  });

  it('returns empty results when there is no match', () => {
    const results = match.findWithoutOrder('BAD');
    expect(results.size).toBe(0);
  });

  it('does not return documents that match only some the words', () => {
    const results = match.findWithoutOrder('bar BAD');
    expect(results.size).toBe(0);
  });

  it('does not care about the order of the words', () => {
    const results = match.findWithoutOrder('def abc');
    expect(results.has('456')).toBe(true);
    expect(results.size).toBe(1);
  });

  it('returns all documents that contain the query words', () => {
    const results = match.findWithoutOrder('COMMON PHRASE');
    expect(results.has('789')).toBe(true);
    expect(results.has('012')).toBe(true);
    expect(results.size).toBe(2);
  });

  it('Handles querys beginning or ending with a space', () => {
    let results: Set<string>;
    results = match.findWithoutOrder(' yz');
    expect(results.has('012')).toBe(true);
    expect(results.size).toBe(1);

    results = match.findWithoutOrder('pqr ');
    expect(results.has('789')).toBe(true);
    expect(results.size).toBe(1);
  });
});
