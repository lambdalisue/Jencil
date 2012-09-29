var DimainPanel, MonomainPanel, TrimainPanel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MonomainPanel = (function() {

  function MonomainPanel(core, profile) {
    var editorPanel;
    editorPanel = new profile.editorClass(core);
    editorPanel.element.addClass('mainPanel');
    return editorPanel;
  }

  return MonomainPanel;

})();

DimainPanel = (function(_super) {

  __extends(DimainPanel, _super);

  function DimainPanel(core, profile) {
    var _this = this;
    this.editorPanel = new profile.editorClass(core);
    this.viewerPanel = new profile.viewerClass(core);
    DimainPanel.__super__.constructor.call(this, core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
    this.element.addClass('mainPanel');
    this.editorPanel.change(function(value) {
      return _this.viewerPanel.update(value);
    });
  }

  DimainPanel.prototype.init = function() {
    DimainPanel.__super__.init.call(this);
    return this.viewerPanel.update(this.editorPanel.val());
  };

  return DimainPanel;

})(VerticalPanel);

TrimainPanel = (function(_super) {

  __extends(TrimainPanel, _super);

  function TrimainPanel(core, profile) {
    var _this = this;
    this.editorPanel = new profile.editorClass(core);
    this.viewerPanel = new profile.viewerClass(core);
    this.helperPanel = new profile.helperClass(core);
    this.verticalPanel = new VerticalPanel(core, this.editorPanel, this.viewerPanel, profile.defaultVolume);
    TrimainPanel.__super__.constructor.call(this, core, this.verticalPanel, this.helperPanel, profile.defaultVolume2);
    this.element.addClass('mainPanel');
    this.editorPanel.change(function(value) {
      return _this.viewerPanel.update(value);
    });
  }

  TrimainPanel.prototype.init = function() {
    TrimainPanel.__super__.init.call(this);
    return this.viewerPanel.update(this.editorPanel.val());
  };

  return TrimainPanel;

})(HorizontalPanel);

namespace('Jencil.mainpanels', function(exports) {
  exports.MonomainPanel = MonomainPanel;
  exports.DimainPanel = DimainPanel;
  return exports.TrimainPanel = TrimainPanel;
});
