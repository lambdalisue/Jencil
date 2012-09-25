var Blackbox, prev, root;

if (!(typeof window !== "undefined" && window !== null)) {
  return;
}

Blackbox = (function() {

  function Blackbox() {
    if (Blackbox.instance != null) {
      return Blackbox.instance;
    }
    if (!(this instanceof Blackbox)) {
      return new Blackbox();
    }
    if (!(document.body != null)) {
      document.writeln('<body></body>');
    }
    this.element = $('<div>').addClass('blackbox').appendTo($('body'));
    this.element.css({
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'opacity': '0.5',
      'background': 'black'
    });
    this.hide();
    Blackbox.instance = this;
  }

  Blackbox.prototype.show = function() {
    return this.element.css({
      'visibility': 'show',
      'z-index': '1000'
    });
  };

  Blackbox.prototype.hide = function() {
    return this.element.css({
      'visibility': 'hidden',
      'z-index': '0'
    });
  };

  Blackbox.prototype.add = function(selector, context) {
    var instance;
    if (selector == null) {
      selector = 'div';
    }
    if (selector instanceof jQuery) {
      instance = selector;
    } else {
      instance = $("<" + selector + ">", context);
    }
    instance.appendTo(this.element);
    return instance;
  };

  Blackbox.prototype.clear = function() {
    this.element.empty();
    return this;
  };

  return Blackbox;

})();

root = this;

prev = {};

prev.Blackbox = root.Blackbox;

root.Blackbox = Blackbox;

root.Blackbox.noConflict = function() {
  root.Blackbox = prev.Blackbox;
  return Blackbox;
};

prev.blackbox = root.blackbox;

root.blackbox = new Blackbox();

root.blackbox.noConflict = function() {
  root.blackbox = prev.blackbox;
  return new Blackbox();
};
