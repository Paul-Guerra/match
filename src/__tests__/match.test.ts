/* tslint:disable:no-magic-numbers */
import DocumentsIndex from '../documents-index';
import Match from '../match';

jest.mock('../document-index');

describe('Match.add', () => {
  let match: Match;

  beforeEach(() => {
    match = new Match('id', 'text');
  });

  it('add', () => {
    match.add({
      id: '123',
      text: 'foo bar baz'
    });

    expect(false).toBe(true);
  });

});
