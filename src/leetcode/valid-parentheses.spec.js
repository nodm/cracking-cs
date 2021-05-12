const { isValidParentheses } = require('./valid-parentheses');

describe('Check validity of the string consisted of brackets ', () => {
  it('()', () => {
    expect(isValidParentheses('()')).toEqual(true);
  });

  it('()[]{}', () => {
    expect(isValidParentheses('()[]{}')).toEqual(true);
  });

  it('([)]', () => {
    expect(isValidParentheses('([)]')).toEqual(false);
  });

  it('({[]({}()){}}([]){}', () => {
    expect(isValidParentheses('({[]({}()){}}([]){}')).toEqual(false);
  });
});
