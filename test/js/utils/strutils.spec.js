(function() {
  var strutils;

  if (typeof window !== "undefined" && window !== null) {
    strutils = Jencil.utils.strutils.strutils;
  } else {
    strutils = require('../../../src/js/utils/strutils.js').strutils;
  }

  describe('Jencil.utils.strutils.strutils', function() {
    describe('#repeat(str, count) => string', function() {
      it('should return "" if the count is lower than 1', function() {
        strutils.repeat("*", 0).should.be.equal('');
        strutils.repeat("*", -1).should.be.equal('');
        strutils.repeat("**", 0).should.be.equal('');
        return strutils.repeat("**", -1).should.be.equal('');
      });
      return it('should return repeated string', function() {
        strutils.repeat("*", 1).should.be.equal('*');
        strutils.repeat("*", 2).should.be.equal('**');
        strutils.repeat("*", 4).should.be.equal('****');
        strutils.repeat("**", 1).should.be.equal('**');
        strutils.repeat("**", 2).should.be.equal('****');
        return strutils.repeat("**", 4).should.be.equal('********');
      });
    });
    describe('#startsWith(str, prefix) -> bool', function() {
      return it('should return true only when the str starts with prefix', function() {
        strutils.startsWith("AAAAbbbbcccc", "A").should.be["true"];
        strutils.startsWith("AAAAbbbbcccc", "AA").should.be["true"];
        strutils.startsWith("AAAAbbbbcccc", "AAAA").should.be["true"];
        strutils.startsWith("AAAAbbbbcccc", "b").should.be["false"];
        strutils.startsWith("AAAAbbbbcccc", "bb").should.be["false"];
        strutils.startsWith("AAAAbbbbcccc", "bbbb").should.be["false"];
        strutils.startsWith("AAAAbbbbAAAA", "A").should.be["true"];
        strutils.startsWith("AAAAbbbbAAAA", "AA").should.be["true"];
        return strutils.startsWith("AAAAbbbbAAAA", "AAAA").should.be["true"];
      });
    });
    describe('#endsWith(str, suffix) -> bool', function() {
      return it('should return true only when the str ends with suffix', function() {
        strutils.endsWith("AAAAbbbbcccc", "c").should.be["true"];
        strutils.endsWith("AAAAbbbbcccc", "cc").should.be["true"];
        strutils.endsWith("AAAAbbbbcccc", "cccc").should.be["true"];
        strutils.endsWith("AAAAbbbbcccc", "b").should.be["false"];
        strutils.endsWith("AAAAbbbbcccc", "bb").should.be["false"];
        strutils.endsWith("AAAAbbbbcccc", "bbbb").should.be["false"];
        strutils.endsWith("AAAAbbbbAAAA", "A").should.be["true"];
        strutils.endsWith("AAAAbbbbAAAA", "AA").should.be["true"];
        return strutils.endsWith("AAAAbbbbAAAA", "AAAA").should.be["true"];
      });
    });
    describe('#trimLeft(str) -> string', function() {
      return it('should trim the spaces of left side', function() {
        strutils.trimLeft('a').should.be.equal('a');
        strutils.trimLeft(' a').should.be.equal('a');
        strutils.trimLeft('  a').should.be.equal('a');
        strutils.trimLeft('    a').should.be.equal('a');
        strutils.trimLeft('a ').should.be.equal('a ');
        strutils.trimLeft('a  ').should.be.equal('a  ');
        strutils.trimLeft('a    ').should.be.equal('a    ');
        strutils.trimLeft(' a ').should.be.equal('a ');
        strutils.trimLeft('  a  ').should.be.equal('a  ');
        return strutils.trimLeft('    a    ').should.be.equal('a    ');
      });
    });
    describe('#trimRight(str) -> string', function() {
      return it('should trim the spaces of right side', function() {
        strutils.trimRight('a').should.be.equal('a');
        strutils.trimRight(' a').should.be.equal(' a');
        strutils.trimRight('  a').should.be.equal('  a');
        strutils.trimRight('    a').should.be.equal('    a');
        strutils.trimRight('a ').should.be.equal('a');
        strutils.trimRight('a  ').should.be.equal('a');
        strutils.trimRight('a    ').should.be.equal('a');
        strutils.trimRight(' a ').should.be.equal(' a');
        strutils.trimRight('  a  ').should.be.equal('  a');
        return strutils.trimRight('    a    ').should.be.equal('    a');
      });
    });
    return describe('#trim(str) -> string', function() {
      return it('should trim the spaces of both side', function() {
        strutils.trim('a').should.be.equal('a');
        strutils.trim(' a').should.be.equal('a');
        strutils.trim('  a').should.be.equal('a');
        strutils.trim('    a').should.be.equal('a');
        strutils.trim('a ').should.be.equal('a');
        strutils.trim('a  ').should.be.equal('a');
        strutils.trim('a    ').should.be.equal('a');
        strutils.trim(' a ').should.be.equal('a');
        strutils.trim('  a  ').should.be.equal('a');
        return strutils.trim('    a    ').should.be.equal('a');
      });
    });
  });

  describe('String.prototype', function() {
    describe('#repeat(count) => string', function() {
      it('should return "" if the count is lower than 1', function() {
        "*".repeat(0).should.be.equal('');
        "*".repeat(-1).should.be.equal('');
        "**".repeat(0).should.be.equal('');
        return "**".repeat(-1).should.be.equal('');
      });
      return it('should return repeated string', function() {
        "*".repeat(1).should.be.equal('*');
        "*".repeat(2).should.be.equal('**');
        "*".repeat(4).should.be.equal('****');
        "**".repeat(1).should.be.equal('**');
        "**".repeat(2).should.be.equal('****');
        return "**".repeat(4).should.be.equal('********');
      });
    });
    describe('#startsWith(prefix) -> bool', function() {
      return it('should return true only when the str starts with prefix', function() {
        "AAAAbbbbcccc".startsWith("A").should.be["true"];
        "AAAAbbbbcccc".startsWith("AA").should.be["true"];
        "AAAAbbbbcccc".startsWith("AAAA").should.be["true"];
        "AAAAbbbbcccc".startsWith("b").should.be["false"];
        "AAAAbbbbcccc".startsWith("bb").should.be["false"];
        "AAAAbbbbcccc".startsWith("bbbb").should.be["false"];
        "AAAAbbbbAAAA".startsWith("A").should.be["true"];
        "AAAAbbbbAAAA".startsWith("AA").should.be["true"];
        return "AAAAbbbbAAAA".startsWith("AAAA").should.be["true"];
      });
    });
    describe('#endsWith(suffix) -> bool', function() {
      return it('should return true only when the str ends with suffix', function() {
        "AAAAbbbbcccc".endsWith("c").should.be["true"];
        "AAAAbbbbcccc".endsWith("cc").should.be["true"];
        "AAAAbbbbcccc".endsWith("cccc").should.be["true"];
        "AAAAbbbbcccc".endsWith("b").should.be["false"];
        "AAAAbbbbcccc".endsWith("bb").should.be["false"];
        "AAAAbbbbcccc".endsWith("bbbb").should.be["false"];
        "AAAAbbbbAAAA".endsWith("A").should.be["true"];
        "AAAAbbbbAAAA".endsWith("AA").should.be["true"];
        return "AAAAbbbbAAAA".endsWith("AAAA").should.be["true"];
      });
    });
    describe('#trimLeft() -> string', function() {
      return it('should trim the spaces of left side', function() {
        'a'.trimLeft().should.be.equal('a');
        ' a'.trimLeft().should.be.equal('a');
        '  a'.trimLeft().should.be.equal('a');
        '    a'.trimLeft().should.be.equal('a');
        'a '.trimLeft().should.be.equal('a ');
        'a  '.trimLeft().should.be.equal('a  ');
        'a    '.trimLeft().should.be.equal('a    ');
        ' a '.trimLeft().should.be.equal('a ');
        '  a  '.trimLeft().should.be.equal('a  ');
        return '    a    '.trimLeft().should.be.equal('a    ');
      });
    });
    describe('#trimRight() -> string', function() {
      return it('should trim the spaces of right side', function() {
        'a'.trimRight().should.be.equal('a');
        ' a'.trimRight().should.be.equal(' a');
        '  a'.trimRight().should.be.equal('  a');
        '    a'.trimRight().should.be.equal('    a');
        'a '.trimRight().should.be.equal('a');
        'a  '.trimRight().should.be.equal('a');
        'a    '.trimRight().should.be.equal('a');
        ' a '.trimRight().should.be.equal(' a');
        '  a  '.trimRight().should.be.equal('  a');
        return '    a    '.trimRight().should.be.equal('    a');
      });
    });
    return describe('#trim() -> string', function() {
      return it('should trim the spaces of both side', function() {
        'a'.trim().should.be.equal('a');
        ' a'.trim().should.be.equal('a');
        '  a'.trim().should.be.equal('a');
        '    a'.trim().should.be.equal('a');
        'a '.trim().should.be.equal('a');
        'a  '.trim().should.be.equal('a');
        'a    '.trim().should.be.equal('a');
        ' a '.trim().should.be.equal('a');
        '  a  '.trim().should.be.equal('a');
        return '    a    '.trim().should.be.equal('a');
      });
    });
  });

}).call(this);
