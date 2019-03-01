import Hello from '../hello-world';

describe('Sample Test', () => {
  it('will pass', () => {
    const h = new Hello();
    expect(true).toBe(true);
  });
});