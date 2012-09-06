var Toolbar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Toolbar = (function(_super) {

  __extends(Toolbar, _super);

  function Toolbar(core) {
    Toolbar.__super__.constructor.call(this, core);
    this.element.addClass('toolbar');
  }

  return Toolbar;

})(Panel);
