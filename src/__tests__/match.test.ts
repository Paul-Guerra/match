/* tslint:disable:no-magic-numbers */

import Match from '../match';

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
