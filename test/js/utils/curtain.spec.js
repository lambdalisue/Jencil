var curtainFactory;

if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

curtainFactory = Jencil.utils.curtain.curtainFactory;

describe('Jencil.utils.curtain.curtainFactory(element) -> instance', function() {
  var instance;
  instance = null;
  before(function() {
    return instance = curtainFactory($(sandbox.createElement('div')));
  });
  after(function() {
    return sandbox.removeAllChildren();
  });
  describe('#on() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('on').a('function');
    });
    return it('should show the curtain element', function() {
      instance.on();
      return instance.css('display').should.be.equal('block');
    });
  });
  describe('#off() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('off').a('function');
    });
    return it('should hide the curtain element', function() {
      instance.off();
      return instance.css('display').should.be.equal('none');
    });
  });
  return describe('#refresh() -> instance', function() {
    it('should be an instance property', function() {
      return instance.should.have.property('refresh').a('function');
    });
    return it('should set the size of the curtain element equal to parent element', function() {
      var parent;
      instance.width(0);
      instance.height(0);
      instance.refresh();
      parent = instance.parent();
      instance.width().should.be.equal(parent.outerWidth(true));
      return instance.height().should.be.equal(parent.outerHeight(true));
    });
  });
});
