'use strict';
/**
 * Interpreter
 * http://www.codeproject.com/Articles/345888/How-to-write-a-simple-interpreter-in-JavaScript
 */
const Tokenize = require('../../').Tokenize;
const Token = Tokenize.Token, TokenType = Tokenize.TokenType;
const Source = require('../../').Source;
const Scanner = require('../../').Scanner;
const Parser = require('../../').Parser;
const Stream = require('../../').Stream;

const isOperator = function (c) { return /[+\-*\/\^%=(),]/.test(c); },
  isDigit = function (c) { return /[0-9]/.test(c); },
  isIdentifier = function (c) { return typeof c === 'string' && !isOperator(c) && !isDigit(c) };

const scan = {
  identifier: function (ch) {
    var identifer = '';
    while (isIdentifier(this.next())) identifer += ch;
    return new Token(TokenType.Identifier, ch, this.location().end());
  },
  operator: function (ch) {
    this.next();
    return new Token(TokenType.Operator, ch, this.location().end());
  },
  number: function (ch) {
    let num = [];
    while (isDigit(ch = this.peek())) num.push(this.next());

    if (this.peek() === '.') {
      do num.push(ch); while (isDigit(ch = this.next()));
    }
    let n = parseFloat(num.join(''));
    if (!isFinite(n)) throw 'Number is too large or too small for a 64-bit double.';
    return new Token(TokenType.Literal)
      .prepend('number')
      .setValue(n)
      .setLocation(this.location().end());
  },
  eof: function (ch) {
    this.next();
    return new Token(TokenType.End, ch, this.location().eof());
  }
};

const source = new Source('12 + 4 / 6', { isCharCode: false });
// Quick and dirty scanner
const scanner = new Scanner(source);

const stream = scanner.scan(function (ch) {
  this.location().start();
  if (ch === '\0') return scan.eof.call(this, ch);
  else if (isOperator(ch)) return scan.operator.call(this, ch);
  else if (isDigit(ch)) return scan.number.call(this, ch);
  else if (isIdentifier(ch)) return scan.identifier.call(this, ch);
});

stream.forEach(console.log);

// const parser = new Parser(stream);

// const tree = parser.parse(function(token, ast){
  
// });