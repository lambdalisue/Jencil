var Fullscreen, HorizontalPanel, Panel, VerticalPanel,
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

VerticalPanel = (function(_super) {

  __extends(VerticalPanel, _super);

  function VerticalPanel(core, fst, snd, defaultVolume) {
    this.fst = fst;
    this.snd = snd;
    this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
    VerticalPanel.__super__.constructor.call(this, core);
    this.element.addClass('vertical');
    this.fst = this.fst || new Panel(core);
    this.snd = this.snd || new Panel(core);
    this.splitter = new VerticalSplitter(core, this.fst, this.snd, this.defaultVolume);
    this.element.append(this.fst.element);
    this.element.append(this.splitter.element);
    this.element.append(this.snd.element);
  }

  VerticalPanel.prototype.init = function() {
    this.splitter.init();
    this.fst.init();
    return this.snd.init();
  };

  VerticalPanel.prototype.adjust = function() {
    this.fst.element.outerHeight(this.element.height());
    this.snd.element.outerHeight(this.element.height());
    this.splitter.element.outerHeight(this.element.height());
    this.splitter.adjust();
    return this;
  };

  return VerticalPanel;

})(Panel);

HorizontalPanel = (function(_super) {

  __extends(HorizontalPanel, _super);

  function HorizontalPanel(core, fst, snd, defaultVolume) {
    this.fst = fst;
    this.snd = snd;
    this.defaultVolume = defaultVolume != null ? defaultVolume : 0.5;
    HorizontalPanel.__super__.constructor.call(this, core);
    this.element.addClass('horizontal');
    this.fst = this.fst || new Panel(core);
    this.snd = this.snd || new Panel(core);
    this.splitter = new HorizontalSplitter(core, this.fst, this.snd, this.defaultVolume);
    this.element.append(this.fst.element);
    this.element.append(this.splitter.element);
    this.element.append(this.snd.element);
  }

  HorizontalPanel.prototype.init = function() {
    this.splitter.init();
    this.fst.init();
    return this.snd.init();
  };

  HorizontalPanel.prototype.adjust = function() {
    this.fst.element.outerWidth(this.element.width());
    this.snd.element.outerWidth(this.element.width());
    this.splitter.element.outerWidth(this.element.width());
    this.splitter.adjust();
    return this;
  };

  return HorizontalPanel;

})(Panel);

Fullscreen = (function(_super) {

  __extends(Fullscreen, _super);

  function Fullscreen(core) {
    var _this = this;
    Fullscreen.__super__.constructor.call(this, core);
    this.element.addClass('fullscreen');
    this.element.css({
      'display': 'table',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%'
    });
    if ($.browser.msie && $.browser.version < 7) {
      this.element.css('position', 'absolute');
      $(window).scroll(function() {
        return _this.element.css('top', $(document).scrollTop());
      });
    }
    this.curtain = $('<div>').addClass('curtain');
    this.curtain.css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'background': 'black',
      'opacity': '0.6'
    });
    this.curtain.click(function() {
      return _this.hide();
    });
    this.cell = $('<div>').css({
      'display': 'table-cell',
      'vertical-align': 'middle',
      'width': '95%',
      'height': '95%'
    });
    this.element.append(this.curtain);
    this.element.append(this.cell);
    this.element.hide();
  }

  Fullscreen.prototype.show = function() {
    var _this = this;
    this._width = this.core.wrapper.element.css('width');
    this._height = this.core.wrapper.element.css('height');
    this.core.wrapper.element.css('width', '90%');
    this.core.wrapper.element.css('height', '90%');
    this.cell.append(this.core.wrapper.element);
    return this.element.fadeIn('fast', function() {
      _this.core.init();
      return _this.core.adjust();
    });
  };

  Fullscreen.prototype.hide = function() {
    var _this = this;
    this.core.wrapper.element.css('width', this._width);
    this.core.wrapper.element.css('height', this._height);
    this.core.element.after(this.core.wrapper.element);
    return this.element.fadeOut('fast', function() {
      _this.core.init();
      return _this.core.adjust();
    });
  };

  return Fullscreen;

})(Panel);
