if window?
  strutils = Jencil.utils.strutils.strutils
else
  strutils = require('../../../src/js/utils/strutils.js').strutils

describe 'Jencil.utils.strutils.strutils', ->
  describe '#repeat(str, count) => string', ->
    it 'should return "" if the count is lower than 1', ->
      strutils.repeat("*", 0).should.be.equal('')
      strutils.repeat("*", -1).should.be.equal('')
      strutils.repeat("**", 0).should.be.equal('')
      strutils.repeat("**", -1).should.be.equal('')

    it 'should return repeated string', ->
      strutils.repeat("*", 1).should.be.equal('*')
      strutils.repeat("*", 2).should.be.equal('**')
      strutils.repeat("*", 4).should.be.equal('****')
      strutils.repeat("**", 1).should.be.equal('**')
      strutils.repeat("**", 2).should.be.equal('****')
      strutils.repeat("**", 4).should.be.equal('********')

  describe '#startsWith(str, prefix) -> bool', ->
    it 'should return true only when the str starts with prefix', ->
      strutils.startsWith("AAAAbbbbcccc", "A").should.be.true
      strutils.startsWith("AAAAbbbbcccc", "AA").should.be.true
      strutils.startsWith("AAAAbbbbcccc", "AAAA").should.be.true
      strutils.startsWith("AAAAbbbbcccc", "b").should.be.false
      strutils.startsWith("AAAAbbbbcccc", "bb").should.be.false
      strutils.startsWith("AAAAbbbbcccc", "bbbb").should.be.false
      strutils.startsWith("AAAAbbbbAAAA", "A").should.be.true
      strutils.startsWith("AAAAbbbbAAAA", "AA").should.be.true
      strutils.startsWith("AAAAbbbbAAAA", "AAAA").should.be.true

  describe '#endsWith(str, suffix) -> bool', ->
    it 'should return true only when the str ends with suffix', ->
      strutils.endsWith("AAAAbbbbcccc", "c").should.be.true
      strutils.endsWith("AAAAbbbbcccc", "cc").should.be.true
      strutils.endsWith("AAAAbbbbcccc", "cccc").should.be.true
      strutils.endsWith("AAAAbbbbcccc", "b").should.be.false
      strutils.endsWith("AAAAbbbbcccc", "bb").should.be.false
      strutils.endsWith("AAAAbbbbcccc", "bbbb").should.be.false
      strutils.endsWith("AAAAbbbbAAAA", "A").should.be.true
      strutils.endsWith("AAAAbbbbAAAA", "AA").should.be.true
      strutils.endsWith("AAAAbbbbAAAA", "AAAA").should.be.true

  describe '#trimLeft(str) -> string', ->
    it 'should trim the spaces of left side', ->
      strutils.trimLeft('a').should.be.equal('a')
      strutils.trimLeft(' a').should.be.equal('a')
      strutils.trimLeft('  a').should.be.equal('a')
      strutils.trimLeft('    a').should.be.equal('a')
      strutils.trimLeft('a ').should.be.equal('a ')
      strutils.trimLeft('a  ').should.be.equal('a  ')
      strutils.trimLeft('a    ').should.be.equal('a    ')
      strutils.trimLeft(' a ').should.be.equal('a ')
      strutils.trimLeft('  a  ').should.be.equal('a  ')
      strutils.trimLeft('    a    ').should.be.equal('a    ')

  describe '#trimRight(str) -> string', ->
    it 'should trim the spaces of right side', ->
      strutils.trimRight('a').should.be.equal('a')
      strutils.trimRight(' a').should.be.equal(' a')
      strutils.trimRight('  a').should.be.equal('  a')
      strutils.trimRight('    a').should.be.equal('    a')
      strutils.trimRight('a ').should.be.equal('a')
      strutils.trimRight('a  ').should.be.equal('a')
      strutils.trimRight('a    ').should.be.equal('a')
      strutils.trimRight(' a ').should.be.equal(' a')
      strutils.trimRight('  a  ').should.be.equal('  a')
      strutils.trimRight('    a    ').should.be.equal('    a')

  describe '#trim(str) -> string', ->
    it 'should trim the spaces of both side', ->
      strutils.trim('a').should.be.equal('a')
      strutils.trim(' a').should.be.equal('a')
      strutils.trim('  a').should.be.equal('a')
      strutils.trim('    a').should.be.equal('a')
      strutils.trim('a ').should.be.equal('a')
      strutils.trim('a  ').should.be.equal('a')
      strutils.trim('a    ').should.be.equal('a')
      strutils.trim(' a ').should.be.equal('a')
      strutils.trim('  a  ').should.be.equal('a')
      strutils.trim('    a    ').should.be.equal('a')


describe 'String.prototype', ->
  describe '#repeat(count) => string', ->
    it 'should return "" if the count is lower than 1', ->
      "*".repeat(0).should.be.equal('')
      "*".repeat(-1).should.be.equal('')
      "**".repeat(0).should.be.equal('')
      "**".repeat(-1).should.be.equal('')

    it 'should return repeated string', ->
      "*".repeat(1).should.be.equal('*')
      "*".repeat(2).should.be.equal('**')
      "*".repeat(4).should.be.equal('****')
      "**".repeat(1).should.be.equal('**')
      "**".repeat(2).should.be.equal('****')
      "**".repeat(4).should.be.equal('********')

  describe '#startsWith(prefix) -> bool', ->
    it 'should return true only when the str starts with prefix', ->
      "AAAAbbbbcccc".startsWith("A").should.be.true
      "AAAAbbbbcccc".startsWith("AA").should.be.true
      "AAAAbbbbcccc".startsWith("AAAA").should.be.true
      "AAAAbbbbcccc".startsWith("b").should.be.false
      "AAAAbbbbcccc".startsWith("bb").should.be.false
      "AAAAbbbbcccc".startsWith("bbbb").should.be.false
      "AAAAbbbbAAAA".startsWith("A").should.be.true
      "AAAAbbbbAAAA".startsWith("AA").should.be.true
      "AAAAbbbbAAAA".startsWith("AAAA").should.be.true

  describe '#endsWith(suffix) -> bool', ->
    it 'should return true only when the str ends with suffix', ->
      "AAAAbbbbcccc".endsWith("c").should.be.true
      "AAAAbbbbcccc".endsWith("cc").should.be.true
      "AAAAbbbbcccc".endsWith("cccc").should.be.true
      "AAAAbbbbcccc".endsWith("b").should.be.false
      "AAAAbbbbcccc".endsWith("bb").should.be.false
      "AAAAbbbbcccc".endsWith("bbbb").should.be.false
      "AAAAbbbbAAAA".endsWith("A").should.be.true
      "AAAAbbbbAAAA".endsWith("AA").should.be.true
      "AAAAbbbbAAAA".endsWith("AAAA").should.be.true

  describe '#trimLeft() -> string', ->
    it 'should trim the spaces of left side', ->
      'a'.trimLeft().should.be.equal('a')
      ' a'.trimLeft().should.be.equal('a')
      '  a'.trimLeft().should.be.equal('a')
      '    a'.trimLeft().should.be.equal('a')
      'a '.trimLeft().should.be.equal('a ')
      'a  '.trimLeft().should.be.equal('a  ')
      'a    '.trimLeft().should.be.equal('a    ')
      ' a '.trimLeft().should.be.equal('a ')
      '  a  '.trimLeft().should.be.equal('a  ')
      '    a    '.trimLeft().should.be.equal('a    ')

  describe '#trimRight() -> string', ->
    it 'should trim the spaces of right side', ->
      'a'.trimRight().should.be.equal('a')
      ' a'.trimRight().should.be.equal(' a')
      '  a'.trimRight().should.be.equal('  a')
      '    a'.trimRight().should.be.equal('    a')
      'a '.trimRight().should.be.equal('a')
      'a  '.trimRight().should.be.equal('a')
      'a    '.trimRight().should.be.equal('a')
      ' a '.trimRight().should.be.equal(' a')
      '  a  '.trimRight().should.be.equal('  a')
      '    a    '.trimRight().should.be.equal('    a')

  describe '#trim() -> string', ->
    it 'should trim the spaces of both side', ->
      'a'.trim().should.be.equal('a')
      ' a'.trim().should.be.equal('a')
      '  a'.trim().should.be.equal('a')
      '    a'.trim().should.be.equal('a')
      'a '.trim().should.be.equal('a')
      'a  '.trim().should.be.equal('a')
      'a    '.trim().should.be.equal('a')
      ' a '.trim().should.be.equal('a')
      '  a  '.trim().should.be.equal('a')
      '    a    '.trim().should.be.equal('a')


