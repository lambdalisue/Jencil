var AjaxViewer, BaseViewer, TemplateViewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseViewer = (function(_super) {

  __extends(BaseViewer, _super);

  function BaseViewer(core, selector, context) {
    if (selector == null) {
      selector = '<div>';
    }
    BaseViewer.__super__.constructor.call(this, core, selector, context);
    this.element.addClass('viewer');
  }

  BaseViewer.prototype.update = function(value, force) {
    throw new Error("NotImplementedError");
  };

  return BaseViewer;

})(Panel);

TemplateViewer = (function(_super) {

  __extends(TemplateViewer, _super);

  function TemplateViewer(core) {
    TemplateViewer.__super__.constructor.call(this, core);
    this.element.css({
      'position': 'relative'
    });
    this.curtain = curtainFactory(this.element);
    this.iframe = $('<iframe>').appendTo(this.element).css({
      margin: '0',
      padding: '0',
      border: 'none',
      outline: 'none',
      resize: 'none',
      width: '100%',
      height: '100%',
      overflow: 'visible'
    });
    this.iframe.attr('frameborder', 0);
    this.iframe = evolute(this.iframe);
    this.iframe.init = function() {
      var iframe;
      iframe = this.get(0);
      if (iframe.contentDocument != null) {
        this.document = iframe.contentDocument;
      } else {
        this.document = iframe.contentWindow.document;
      }
      return this.document.write('<body></body>');
    };
    this.iframe.write = function(value) {
      var scrollTop;
      if (this.document != null) {
        try {
          scrollTop = this.document.documentElement.scrollTop;
        } catch (e) {
          scrollTop = 0;
        }
        this.document.open();
        this.document.write(value);
        this.document.close();
        this.document.documentElement.scrollTop = scrollTop;
        this.width(this.document.scrollLeft);
        this.height(this.document.scrollTop);
        return true;
      }
      return false;
    };
    this.iframe.loadTemplate = function(templatePath, value) {
      var _this = this;
      return $.ajax({
        url: templatePath,
        success: function(data) {
          _this._template = data;
          return _this.write(value);
        }
      });
    };
  }

  TemplateViewer.prototype.init = function() {
    return this.iframe.init();
  };

  TemplateViewer.prototype.update = function(value, force) {
    if (this.iframe._template != null) {
      value = this.iframe._template.replace("{{content}}", value);
    } else if (this.templatePath != null) {
      this.iframe.loadTemplate(this.templatePath, value);
    }
    return this.iframe.write(value);
  };

  TemplateViewer.prototype.adjust = function() {
    this.iframe.outerWidth(this.element.width());
    this.iframe.outerHeight(this.element.height());
    return this;
  };

  return TemplateViewer;

})(BaseViewer);

AjaxViewer = (function(_super) {

  __extends(AjaxViewer, _super);

  function AjaxViewer(core, config) {
    this.config = config;
    AjaxViewer.__super__.constructor.call(this, core);
    this.config = jQuery.extend({
      type: 'GET',
      dataType: 'text',
      data: function(value) {
        return encodeURIComponent(value);
      },
      url: null
    }, this.config);
  }

  AjaxViewer.prototype.update = function(value, force) {
    var _this = this;
    if (this._valueCache !== value || force) {
      this._valueCache = value;
      return $.ajax({
        type: this.config.type,
        dataType: this.config.dataType,
        data: JSON.stringify(this.config.data(value)),
        url: this.config.url,
        success: function(value) {
          if (_this.iframe._template != null) {
            value = _this.iframe._template.replace("{{content}}", value);
          } else if (_this.templatePath != null) {
            _this.iframe.loadTemplate(_this.templatePath, value);
          }
          return _this.iframe.write(value);
        }
      });
    }
  };

  return AjaxViewer;

})(TemplateViewer);

namespace('Jencil.ui.widgets.viewers', function(exports) {
  exports.BaseViewer = BaseViewer;
  exports.TemplateViewer = TemplateViewer;
  return exports.AjaxViewer = AjaxViewer;
});
