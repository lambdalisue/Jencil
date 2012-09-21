
if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

describe('utils.selection.Selection(document, textarea) => object', function() {
  var instance, textarea;
  it("should return Selection instance", function() {
    var instance;
    instance = new Selection(document, sandbox.createElement('textarea'));
    return instance.should.be.a["instanceof"](Selection);
  });
  textarea = instance = null;
  before(function() {
    textarea = sandbox.createElement('textarea');
    return instance = new Selection(document, textarea);
  });
  after(function() {
    return sandbox.removeAllChildren();
  });
  beforeEach(function() {
    return textarea.value = "000001111122222333334444455555\nAAAAABBBBBCCCCCDDDDDEEEEEFFFFF\naaaaabbbbbcccccdddddeeeeefffff";
  });
  describe('#caret([start, end]) => instance | [start, end]', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('caret').a('function');
    });
    it('should return a current caret position as [start, end]', function() {
      var caret;
      caret = instance.caret();
      caret.should.length(2);
      caret[0].should.a('number');
      return caret[1].should.a('number');
    });
    return it('should set current caret position and return the instance', function() {
      instance.caret(1, 2).should.be.equal(instance);
      instance.caret().should.be.eql([1, 2]);
      instance.caret([3, 5]).should.be.equal(instance);
      instance.caret().should.be.eql([3, 5]);
      instance.caret(2).should.be.equal(instance);
      return instance.caret().should.be.eql([2, 2]);
    });
  });
  describe('#caretOffset(offset) => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('caretOffset').a('function');
    });
    return it('should set current caret position with offset value', function() {
      instance.caret(1);
      instance.caretOffset(5).should.be.equal(instance);
      return instance.caret().should.be.eql([6, 6]);
    });
  });
  describe('#replace(str, start, end) => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('replace').a('function');
    });
    return it('should replace a range (s, e)', function() {
      instance.replace('*****', 5, 10);
      instance.caret(5, 10);
      instance.text().should.equal('*****');
      instance.replace('++++++++++', 10, 15);
      instance.caret(5, 25);
      return instance.text().should.equal('*****++++++++++33333');
    });
  });
  describe('#text(str, keepSelection) => string | instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('text').a('function');
    });
    it('should return a selected text', function() {
      var selection;
      instance.caret(5, 15);
      selection = instance.text();
      selection.should.a('string');
      return selection.should.equal('1111122222');
    });
    it('should replace a selection', function() {
      instance.caret(5, 10);
      instance.text('*****');
      instance.caret().should.eql([10, 10]);
      instance.caret(5, 10);
      instance.text().should.equal('*****');
      instance.caret(10, 15);
      instance.text('++++++++++');
      instance.caret().should.eql([20, 20]);
      instance.caret(5, 25);
      return instance.text().should.equal('*****++++++++++33333');
    });
    return it('should replace a selection and keep the selection', function() {
      instance.caret(5, 10);
      instance.text('*****', true);
      instance.caret().should.eql([5, 10]);
      instance.caret(10, 15);
      instance.text('++++++++++', true);
      return instance.caret().should.eql([10, 20]);
    });
  });
  describe('#insertBefore(str, keepSelection) => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('insertBefore').a('function');
    });
    it('should insert a text before the selection', function() {
      instance.caret(5, 10);
      instance.insertBefore('*****');
      instance.caret().should.eql([10, 10]);
      instance.caret(0, 15);
      return instance.text().should.equal('00000*****11111');
    });
    return it('should insert a text before the selection and keep the selection', function() {
      instance.caret(5, 10);
      instance.insertBefore('*****', true);
      return instance.caret().should.eql([5, 10]);
    });
  });
  describe('#insertAfter(str, keepSelection) => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('insertAfter').a('function');
    });
    it('should insert a text after the selection', function() {
      instance.caret(5, 10);
      instance.insertAfter('*****');
      instance.caret().should.eql([15, 15]);
      instance.caret(5, 20);
      return instance.text().should.equal('11111*****22222');
    });
    return it('should nsert a text after the selection and keep the selection', function() {
      instance.caret(5, 10);
      instance.insertAfter('*****', true);
      return instance.caret().should.eql([10, 15]);
    });
  });
  describe('#enclose(lhs, rhs, keepSelection) => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('enclose').a('function');
    });
    it('should enclose the selection with lhs/rhs', function() {
      instance.caret(5, 10);
      instance.enclose('<<<<<', '>>>>>');
      instance.caret().should.eql([20, 20]);
      instance.caret(0, 25);
      return instance.text().should.equal('00000<<<<<11111>>>>>22222');
    });
    return it('should enclose the selection with lhs/rhs and keep the selection', function() {
      instance.caret(5, 10);
      instance.enclose('<<<<<', '>>>>>', true);
      return instance.caret().should.eql([5, 20]);
    });
  });
  describe('#lineCaret(pos) => caret', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('lineCaret').a('function');
    });
    it('should return caret of the line', function() {
      return instance.lineCaret(50).should.be.eql([31, 61]);
    });
    return it('should return caret of the current line', function() {
      instance.caret(50);
      return instance.lineCaret().should.be.eql([31, 61]);
    });
  });
  describe('#line(value, keepSelection) => string | instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('line').a('function');
    });
    it('should return text of the current line', function() {
      instance.caret(50);
      return instance.line().should.be.equal('AAAAABBBBBCCCCCDDDDDEEEEEFFFFF');
    });
    return it('should set current line and return the instance', function() {
      instance.caret(50);
      instance.line('**********').should.be.equal(instance);
      return textarea.value.should.be.equal("000001111122222333334444455555\n**********\naaaaabbbbbcccccdddddeeeeefffff");
    });
  });
  describe('#selectWholeLine(pos) => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('selectWholeLine').a('function');
    });
    return it('should select whole line of the pos', function() {
      instance.selectWholeLine(50).should.be.equal(instance);
      return instance.caret().should.be.eql([31, 61]);
    });
  });
  return describe('#selectWholeCurrentLine() => instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('selectWholeCurrentLine').a('function');
    });
    return it('should select whole line of the pos', function() {
      instance.caret(50);
      instance.selectWholeCurrentLine().should.be.equal(instance);
      return instance.caret().should.be.eql([31, 61]);
    });
  });
});
