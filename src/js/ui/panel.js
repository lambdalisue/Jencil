var HorizontalPanel, MultiplePanel, Panel, VerticalPanel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Panel = (function(_super) {

  __extends(Panel, _super);

  function Panel(core, selector, context) {
    if (selector == null) {
      selector = '<div>';
    }
    Panel.__super__.constructor.call(this, core, selector, context);
    this.element.addClass('panel');
  }

  return Panel;

})(Widget);

MultiplePanel = (function(_super) {

  __extends(MultiplePanel, _super);

  function MultiplePanel(core, fst, snd, splitter) {
    this.fst = fst;
    this.snd = snd;
    this.splitter = splitter;
    MultiplePanel.__super__.constructor.call(this, core);
    this.element.addClass('multiple');
    this.element.append(this.fst.element);
    this.element.append(this.splitter.element);
    this.element.append(this.snd.element);
  }

  MultiplePanel.prototype.init = function() {
    this.splitter.init();
    this.fst.init();
    return this.snd.init();
  };

  return MultiplePanel;

})(Panel);

VerticalPanel = (function(_super) {

  __extends(VerticalPanel, _super);

  function VerticalPanel(core, fst, snd, defaultVolume) {
    var splitter;
    if (defaultVolume == null) {
      defaultVolume = 0.5;
    }
    splitter = new VerticalSplitter(core, fst, snd, defaultVolume);
    VerticalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
    this.element.addClass('vertical');
  }

  VerticalPanel.prototype.adjust = function() {
    this.fst.element.outerHeight(this.element.height());
    this.snd.element.outerHeight(this.element.height());
    this.splitter.element.outerHeight(this.element.height());
    this.splitter.adjust();
    return this;
  };

  return VerticalPanel;

})(MultiplePanel);

HorizontalPanel = (function(_super) {

  __extends(HorizontalPanel, _super);

  function HorizontalPanel(core, fst, snd, defaultVolume) {
    var splitter;
    if (defaultVolume == null) {
      defaultVolume = 0.5;
    }
    splitter = new HorizontalSplitter(core, fst, snd, defaultVolume);
    HorizontalPanel.__super__.constructor.call(this, core, fst, snd, splitter);
    this.element.addClass('horizontal');
  }

  HorizontalPanel.prototype.adjust = function() {
    this.fst.element.outerWidth(this.element.width());
    this.snd.element.outerWidth(this.element.width());
    this.splitter.element.outerWidth(this.element.width());
    this.splitter.adjust();
    return this;
  };

  return HorizontalPanel;

})(MultiplePanel);
