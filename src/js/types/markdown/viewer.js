var MarkdownJsViewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MarkdownJsViewer = (function(_super) {

  __extends(MarkdownJsViewer, _super);

  function MarkdownJsViewer() {
    return MarkdownJsViewer.__super__.constructor.apply(this, arguments);
  }

  MarkdownJsViewer.prototype.update = function(value, force) {
    var html;
    html = window.markdown.toHTML(value);
    return MarkdownJsViewer.__super__.update.call(this, html, force);
  };

  return MarkdownJsViewer;

})(TemplateViewer);
