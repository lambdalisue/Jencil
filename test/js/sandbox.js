(function() {
  var Sandbox, prev, root;

  if (!(typeof window !== "undefined" && window !== null)) {
    return;
  }

  Sandbox = (function() {

    function Sandbox() {
      if (Sandbox.instance != null) {
        return Sandbox.instance;
      } else if (!(this instanceof Sandbox)) {
        return new Sandbox();
      }
      this.element = document.getElementById('sandbox');
      if (!(this.element != null)) {
        this.element = document.createElement('div');
      }
      if (!(document.body != null)) {
        document.writeln('<body></body>');
      }
      document.body.appendChild(this.element);
      this.element.style.visibility = 'hidden';
      this.element.style.width = "0px";
      this.element.style.height = "0px";
      this.element.style.maxWidth = "0px";
      this.element.style.maxHeight = "0px";
      this.element.style.margin = "0";
      this.element.style.border = "none";
      this.element.style.padding = "0";
      this.element.style.overflow = 'hidden';
      Sandbox.instance = this;
    }

    Sandbox.prototype.createElement = function(name) {
      var element;
      element = document.createElement(name);
      this.appendChild(element);
      return element;
    };

    Sandbox.prototype.appendChild = function(appendedNode) {
      this.element.appendChild(appendedNode);
      return this;
    };

    Sandbox.prototype.removeChild = function(removedNode) {
      this.element.removeChild(removedNode);
      return this;
    };

    Sandbox.prototype.removeAllChildren = function() {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
      return this;
    };

    Sandbox.prototype.normalize = function() {
      this.element.normalize();
      return this;
    };

    return Sandbox;

  })();

  root = this;

  prev = {};

  prev.Sandbox = root.Sandbox;

  root.Sandbox = Sandbox;

  root.Sandbox.noConflict = function() {
    root.Sandbox = prev.Sandbox;
    return Sandbox;
  };

  prev.sandbox = root.sandbox;

  root.sandbox = Sandbox();

  root.sandbox.noConflict = function() {
    root.sandbox = prev.sandbox;
    return Sandbox();
  };

}).call(this);
