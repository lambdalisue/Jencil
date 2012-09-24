var BaseHelper, TemplateHelper,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseHelper = (function(_super) {

  __extends(BaseHelper, _super);

  function BaseHelper(core, selector, context) {
    if (selector == null) {
      selector = '<div>';
    }
    BaseHelper.__super__.constructor.call(this, core, selector, context);
    this.element.addClass('helper');
  }

  return BaseHelper;

})(Panel);

TemplateHelper = (function(_super) {

  __extends(TemplateHelper, _super);

  function TemplateHelper(core) {
    TemplateHelper.__super__.constructor.call(this, core);
    this.templatePath = this.core.options.helperTemplatePath;
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
    this.iframe.loadTemplate = function(templatePath) {
      var _this = this;
      return $.ajax({
        url: templatePath,
        success: function(data) {
          return _this.write(data);
        }
      });
    };
  }

  TemplateHelper.prototype.init = function() {
    this.iframe.init();
    if (this.templatePath != null) {
      return this.iframe.loadTemplate(this.templatePath);
    }
  };

  TemplateHelper.prototype.adjust = function() {
    this.iframe.outerWidth(this.element.width());
    this.iframe.outerHeight(this.element.height());
    return this;
  };

  return TemplateHelper;

})(BaseHelper);

namespace('Jencil.helpers', function(exports) {
  exports.BaseHelper = BaseHelper;
  return exports.TemplateHelper = TemplateHelper;
});
