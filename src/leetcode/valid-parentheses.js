// https://leetcode.com/problems/valid-parentheses
//
// Given a string s containing just the characters '(', ')', '{', '}', '[', ']',
// determine if the input string is valid.
//
// Input is valid if:
//  - open brackets are closed by the same type of brackets;
//  - open brackets are closed in the correct order


const BRACKETS = '(){}[]';

function isValidParentheses(s) {
  if (!s.length) {
    return true;
  }

  const parenthesesStack = [];
  for(const char of s) {
    const bracketIndex = BRACKETS.indexOf(char);

    const isOpenBracket = bracketIndex % 2 === 0;

    if (isOpenBracket) {
      parenthesesStack.push(char);
    } else {
      const lastBracket = parenthesesStack.pop();
      if (lastBracket !== BRACKETS[bracketIndex - 1]) {
        return false;
      }
    }
  }

  return !parenthesesStack.length;
}

module.exports = { isValidParentheses };
