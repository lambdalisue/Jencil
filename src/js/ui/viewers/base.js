var IframePanel, TemplatePanel, TemplateViewer, Viewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Viewer = (function(_super) {

  __extends(Viewer, _super);

  function Viewer(core, selector, context) {
    Viewer.__super__.constructor.call(this, core, selector, context);
    this.element.addClass('viewer');
  }

  Viewer.prototype.update = function(value) {
    throw "NotImplementedError";
  };

  return Viewer;

})(Panel);

IframePanel = (function(_super) {

  __extends(IframePanel, _super);

  function IframePanel(core) {
    IframePanel.__super__.constructor.call(this, core, '<iframe>');
    this.element.css({
      margin: '0',
      padding: '0',
      border: 'none',
      outline: 'none',
      resize: 'none',
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    });
    this.element.attr('frameborder', 0);
  }

  IframePanel.prototype.init = function() {
    var iframe;
    iframe = this.element.get(0);
    if (iframe.contentDocument != null) {
      this.document = iframe.contentDocument;
    } else {
      this.document = iframe.contentWindow.document;
    }
    return this.document.write('<body></body>');
  };

  IframePanel.prototype.write = function(content) {
    var scrollTop;
    if (this.document != null) {
      try {
        scrollTop = this.document.documentElement.scrollTop;
      } catch (e) {
        scrollTop = 0;
      }
      this.document.open();
      this.document.write(content);
      this.document.close();
      this.document.documentElement.scrollTop = scrollTop;
      return true;
    }
    return false;
  };

  return IframePanel;

})(Panel);

TemplatePanel = (function(_super) {

  __extends(TemplatePanel, _super);

  function TemplatePanel() {
    return TemplatePanel.__super__.constructor.apply(this, arguments);
  }

  TemplatePanel.prototype.loadTemplate = function(templatePath, value) {
    var _this = this;
    return $.ajax({
      url: templatePath,
      success: function(data) {
        _this._template = data;
        return _this.write(value);
      }
    });
  };

  TemplatePanel.prototype.write = function(content) {
    if (this._template != null) {
      content = this._template.replace("{{content}}", content);
    } else if (this.templatePath != null) {
      this.loadTemplate(this.templatePath, content);
    }
    return TemplatePanel.__super__.write.call(this, content);
  };

  return TemplatePanel;

})(IframePanel);

TemplateViewer = (function(_super) {

  __extends(TemplateViewer, _super);

  function TemplateViewer(core) {
    TemplateViewer.__super__.constructor.call(this, core);
    this.templatePanel = new TemplatePanel(core);
    this.templatePanel.templatePath = this.core.options.previewTemplatePath;
    this.element.append(this.templatePanel.element);
  }

  TemplateViewer.prototype.adjust = function() {
    this.templatePanel.element.outerWidth(this.element.width());
    this.templatePanel.element.outerHeight(this.element.height());
    this.templatePanel.adjust();
    return this;
  };

  TemplateViewer.prototype.update = function(value) {
    this.templatePanel.write(value);
    return this;
  };

  return TemplateViewer;

})(Viewer);
