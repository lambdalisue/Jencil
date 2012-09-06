(function() {

  if (!(typeof window !== "undefined" && window !== null)) {
    return;
  }

  describe('extends.jQuery', function() {
    var div, factory, instance;
    div = instance = null;
    factory = function(div) {
      instance = jQuery(div);
      instance.width(10);
      instance.height(10);
      instance.css({
        'margin': 5,
        'border-style': 'solid',
        'border-width': 10,
        'padding': 15
      });
      return instance;
    };
    before(function() {
      div = sandbox.createElement('div');
      return instance = factory(div);
    });
    describe('#ncss(propertyName, [defaultValue=null]) => number | defaultValue', function() {
      it('should return number value of a particular css number property', function() {
        instance.css('min-width', 10);
        instance.should.have.a.property('ncss').a('function');
        expect(instance.css('min-width')).a('string').equal('10px');
        return expect(instance.ncss('min-width')).a('number').equal(10);
      });
      return it('should return defaultValue when the value is not exist', function() {
        expect(instance.css('max-width')).a('string').equal('none');
        expect(instance.ncss('max-width')).not.exist;
        return expect(instance.ncss('max-width', 10)).a('number').equal(10);
      });
    });
    describe('#outerWidth([includeMargin=false, value]) => number | instance', function() {
      it('should return outer width (border + padding + width) of the widget', function() {
        instance.should.have.a.property('outerWidth').a('function');
        return instance.outerWidth().should.be.a('number').equal(60);
      });
      it('should return outer width include margin (margin + border + padding + width) of the widget', function() {
        return instance.outerWidth(true).should.be.a('number').equal(70);
      });
      it('should change outer width of the widget and return this instance', function() {
        instance.outerWidth(false, 100).should.be.equal(instance);
        instance.width().should.be.equal(50);
        instance.outerWidth(150).should.be.equal(instance);
        return instance.width().should.be.equal(100);
      });
      return it('should change outer width include margin of the widget and return this instance', function() {
        instance.outerWidth(true, 100).should.be.equal(instance);
        return instance.width().should.be.equal(40);
      });
    });
    describe('#outerHeight([includeMargin=false, value]) => number | instance', function() {
      it('should return outer height of the widget', function() {
        instance.should.have.a.property('outerHeight').a('function');
        return instance.outerHeight().should.be.a('number').equal(60);
      });
      it('should return outer height include margin of the widget', function() {
        return instance.outerHeight(true).should.be.a('number').equal(70);
      });
      it('should change outer height of the widget and return this instance', function() {
        instance.outerHeight(false, 100).should.be.equal(instance);
        instance.height().should.be.equal(50);
        instance.outerHeight(150).should.be.equal(instance);
        return instance.height().should.be.equal(100);
      });
      return it('should change outer height include margin of the widget and return this instance', function() {
        instance.outerHeight(true, 100).should.be.equal(instance);
        return instance.height().should.be.equal(40);
      });
    });
    describe('#nonContentWidth([includeMargin=false]) => number', function() {
      it('should return non content width (border + padding)', function() {
        instance.should.have.property('nonContentWidth').a('function');
        return instance.nonContentWidth().should.be.equal(50);
      });
      return it('should return non content width include margin (margin + border + padding) with includeMargin=true', function() {
        return instance.nonContentWidth(true).should.be.equal(60);
      });
    });
    describe('#nonContentHeight([includeMargin=false]) => number', function() {
      it('should return non content height (border + padding)', function() {
        instance.should.have.property('nonContentHeight').a('function');
        return instance.nonContentHeight().should.be.equal(50);
      });
      return it('should return non content height include margin (margin + border + padding) with includeMargin=true', function() {
        return instance.nonContentHeight(true).should.be.equal(60);
      });
    });
    describe('#minWidth() => number | null', function() {
      return it('should return min width', function() {
        instance.css('min-width', 10);
        instance.should.have.a.property('minWidth').a('function');
        return instance.minWidth().should.be.a('number').equal(10);
      });
    });
    describe('#minHeight() => number | null', function() {
      return it('should return min height', function() {
        instance.css('min-height', 10);
        instance.should.have.a.property('minHeight').a('function');
        return instance.minHeight().should.be.a('number').equal(10);
      });
    });
    describe('#maxWidth() => number | null', function() {
      it('should return max width', function() {
        instance.css('max-width', 10);
        instance.should.have.a.property('maxWidth').a('function');
        return instance.maxWidth().should.be.a('number').equal(10);
      });
      return it('should return null for widget which has no max width', function() {
        var instance2;
        instance2 = jQuery("<div>");
        return expect(instance2.maxWidth()).equal(null);
      });
    });
    return describe('#maxHeight() => number | null', function() {
      it('should return max height', function() {
        instance.css('max-height', 10);
        instance.should.have.a.property('maxHeight').a('function');
        return instance.maxHeight().should.be.a('number').equal(10);
      });
      return it('should return null for widget which has no max height', function() {
        var instance2;
        instance2 = jQuery("<div>");
        return expect(instance2.maxHeight()).equal(null);
      });
    });
  });

}).call(this);
