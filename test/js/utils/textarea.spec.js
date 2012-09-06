(function() {

  if (!(typeof window !== "undefined" && window !== null)) {
    return;
  }

  describe('utils.textarea.Selection(document, textarea) => object', function() {
    var instance, textarea;
    textarea = instance = null;
    before(function() {
      textarea = sandbox.createElement('textarea');
      return instance = new Selection(document, textarea);
    });
    beforeEach(function() {
      return textarea.value = '000001111122222333334444455555';
    });
    after(function() {
      return sandbox.removeAllChildren();
    });
    describe('#caret([start, end]) => instance | [start, end]', function() {
      it('should return a list which length is 2', function() {
        var selection;
        selection = instance.caret();
        selection.should.length(2);
        selection[0].should.a('number');
        return selection[1].should.a('number');
      });
      return it('should be able to change selection', function() {
        var selection;
        instance.caret(10, 10).should.equal(instance);
        selection = instance.caret();
        selection[0].should.eql(10);
        return selection[1].should.eql(10);
      });
    });
    describe('#text() => string', function() {
      return it('should return a string selected', function() {
        var selection;
        instance.caret(5, 15);
        selection = instance.text();
        selection.should.a('string');
        return selection.should.equal('1111122222');
      });
    });
    describe('#replace(str, start, end) => instance', function() {
      return it('should be able to replace range (s, e)', function() {
        instance.replace('*****', 5, 10);
        instance.caret(5, 10);
        instance.text().should.equal('*****');
        instance.replace('++++++++++', 10, 15);
        instance.caret(5, 25);
        return instance.text().should.equal('*****++++++++++33333');
      });
    });
    describe('#replaceSelection(str, [keepSelection=false]) => instance', function() {
      it('should be able to replace selection', function() {
        instance.caret(5, 10);
        instance.replaceSelection('*****');
        instance.caret().should.eql([10, 10]);
        instance.caret(5, 10);
        instance.text().should.equal('*****');
        instance.caret(10, 15);
        instance.replaceSelection('++++++++++');
        instance.caret().should.eql([20, 20]);
        instance.caret(5, 25);
        return instance.text().should.equal('*****++++++++++33333');
      });
      return it('should be able to keep selection after replacement with keepSelection=true', function() {
        instance.caret(5, 10);
        instance.replaceSelection('*****', true);
        instance.caret().should.eql([5, 10]);
        instance.caret(10, 15);
        instance.replaceSelection('++++++++++', true);
        return instance.caret().should.eql([10, 20]);
      });
    });
    describe('#insertBeforeSelection(str, [keepSelection=false]) => instance', function() {
      it('should be able to insert before selection', function() {
        instance.caret(5, 10);
        instance.insertBeforeSelection('*****');
        instance.caret().should.eql([10, 10]);
        instance.caret(0, 15);
        return instance.text().should.equal('00000*****11111');
      });
      return it('should be able to keep selection after insertion with keepSelection=true', function() {
        instance.caret(5, 10);
        instance.insertBeforeSelection('*****', true);
        return instance.caret().should.eql([5, 10]);
      });
    });
    describe('#insertAfterSelection(str, [keepSelection=false]) => instance', function() {
      it('should be able to insert after selection', function() {
        instance.caret(5, 10);
        instance.insertAfterSelection('*****');
        instance.caret().should.eql([15, 15]);
        instance.caret(5, 20);
        return instance.text().should.equal('11111*****22222');
      });
      return it('should be able to keep selection after insertion with keepSelection=true', function() {
        instance.caret(5, 10);
        instance.insertAfterSelection('*****', true);
        return instance.caret().should.eql([10, 15]);
      });
    });
    return describe('#wrapSelection(b, a, [keepSelection=false]) => instance', function() {
      it('should be able to wrap around selection', function() {
        instance.caret(5, 10);
        instance.wrapSelection('<<<<<', '>>>>>');
        instance.caret().should.eql([20, 20]);
        instance.caret(0, 25);
        return instance.text().should.equal('00000<<<<<11111>>>>>22222');
      });
      return it('should be able to keep selection after wrappping', function() {
        instance.caret(5, 10);
        instance.wrapSelection('<<<<<', '>>>>>', true);
        return instance.caret().should.eql([5, 20]);
      });
    });
  });

  describe('utils.textarea.Textarea(document, textarea) => object', function() {
    var instance, textarea;
    textarea = instance = null;
    before(function() {
      textarea = sandbox.createElement('textarea');
      return instance = new Textarea(document, textarea);
    });
    beforeEach(function() {
      return textarea.value = '000001111122222333334444455555';
    });
    after(function() {
      return sandbox.removeAllChildren();
    });
    describe(".selection : Selection", function() {
      return it('should be an instance of Selection', function() {
        instance.should.have.a.property('selection');
        return instance.selection.should.an.instanceOf(Selection);
      });
    });
    return describe('#val([value]) => instance | number', function() {
      it('should be able to get current value', function() {
        return instance.val().should.equal('000001111122222333334444455555');
      });
      return it('should be able to set new value', function() {
        instance.val('*****').should.equal(instance);
        return instance.val().should.equal('*****');
      });
    });
  });

}).call(this);
