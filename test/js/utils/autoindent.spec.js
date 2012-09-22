
if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

describe('utils.autoindent.autoIndentable(textarea, pre, post) -> AutoIndentableObj', function() {
  var instance, textarea;
  textarea = $(sandbox.createElement('textarea'));
  instance = autoIndentable(textarea);
  beforeEach(function() {
    return instance.val('001122\n  bbcc\n    CC');
  });
  it('should have selection instance', function() {
    return instance.should.have.property('selection')["instanceof"](Selection);
  });
  describe('#autoIndent(e) -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('autoIndent').a('function');
    });
    it('should add new line when the pressed key is RETURN', function() {
      var e;
      instance.val('001122\n  bbcc\n    CC');
      e = jQuery.Event('keydown');
      e.which = 13;
      instance.selection.caret(6);
      instance.autoIndent(e);
      return instance.val().should.be.equal("001122\n\n  bbcc\n    CC");
    });
    it('should add new line and leading tabs when the pressed key is RETURN', function() {
      var e;
      instance.val('001122\n\tbbcc\n\t\tCC');
      e = jQuery.Event('keydown');
      e.which = 13;
      instance.selection.caret(12);
      instance.autoIndent(e);
      instance.val().should.be.equal("001122\n\tbbcc\n\t\n\t\tCC");
      instance.val('001122\n\tbbcc\n\t\tCC');
      instance.selection.caret(17);
      instance.autoIndent(e);
      return instance.val().should.be.equal("001122\n\tbbcc\n\t\tCC\n\t\t");
    });
    return it('should add new line and leading spaces when the pressed key is RETURN', function() {
      var e;
      instance.val('001122\n  bbcc\n    CC');
      e = jQuery.Event('keydown');
      e.which = 13;
      instance.selection.caret(13);
      instance.autoIndent(e);
      instance.val().should.be.equal("001122\n  bbcc\n  \n    CC");
      instance.val('001122\n  bbcc\n    CC');
      instance.selection.caret(20);
      instance.autoIndent(e);
      return instance.val().should.be.equal("001122\n  bbcc\n    CC\n    ");
    });
  });
  describe('#autoIndent.enable() -> instance', function() {
    it('should be an instance property', function() {
      return instance.autoIndent.should.have.property('enable').a('function');
    });
    return it('should enable auto indent feature and the instance', function() {
      var e, mock;
      mock = sinon.mock(instance).expects('autoIndent').once();
      instance.autoIndent.disable();
      instance.autoIndent.enable().should.be.equal(instance);
      e = jQuery.Event('keydown');
      e.which = 13;
      instance.trigger(e);
      mock.verify();
      return instance.autoIndent.restore();
    });
  });
  describe('#autoIndent.disable() -> instance', function() {
    it('should be an instance property', function() {
      return instance.autoIndent.should.have.property('disable').a('function');
    });
    return it('should disable auto indent feature and the instance', function() {
      var e, mock;
      mock = sinon.mock(instance).expects('autoIndent').never();
      instance.autoIndent.enable();
      instance.autoIndent.disable().should.be.equal(instance);
      e = jQuery.Event('keydown');
      e.which = 13;
      instance.trigger(e);
      mock.verify();
      instance.autoIndent.restore();
      return instance.autoIndent.enable();
    });
  });
  describe('#autoIndent.pre(e, line) -> instance', function() {
    it('should not exists if nothing has specified', function() {
      return instance.autoIndent.should.not.have.property('pre');
    });
    it('should exists if pre callback has specified', function() {
      var dummy, instance2;
      dummy = function() {
        return this;
      };
      instance2 = autoIndentable(textarea, dummy);
      return instance2.autoIndent.should.have.property('pre').a('function');
    });
    return it('should called before new line and leading spaces are added', function() {
      var aspy, e, instance2, pspy;
      instance2 = autoIndentable(textarea, function() {
        return this;
      });
      pspy = sinon.spy(instance2.autoIndent, 'pre');
      aspy = sinon.spy(instance2.selection, 'insertAfter');
      e = jQuery.Event('keydown');
      e.which = 13;
      instance2.trigger(e);
      pspy.calledBefore(aspy).should.be["true"];
      instance2.autoIndent.pre.restore();
      return instance2.selection.insertAfter.restore();
    });
  });
  return describe('#autoIndent.post(e, line, indent, insert) -> instance', function() {
    it('should not exists if nothing has specified', function() {
      return instance.autoIndent.should.not.have.property('post');
    });
    it('should exists if pre callback has specified', function() {
      var dummy, instance2;
      dummy = function() {
        return this;
      };
      instance2 = autoIndentable(textarea, null, dummy);
      return instance2.autoIndent.should.have.property('post').a('function');
    });
    return it('should called after new line and leading spaces are added', function() {
      var aspy, e, instance2, pspy;
      instance2 = autoIndentable(textarea, null, function() {
        return this;
      });
      aspy = sinon.spy(instance2.selection, 'insertAfter');
      pspy = sinon.spy(instance2.autoIndent, 'post');
      e = jQuery.Event('keydown');
      e.which = 13;
      instance2.trigger(e);
      pspy.calledAfter(aspy).should.be["true"];
      instance2.autoIndent.post.restore();
      return instance2.selection.insertAfter.restore();
    });
  });
});
