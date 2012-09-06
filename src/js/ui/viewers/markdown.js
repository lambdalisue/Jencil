var MarkdownViewer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MarkdownViewer = (function(_super) {

  __extends(MarkdownViewer, _super);

  function MarkdownViewer() {
    return MarkdownViewer.__super__.constructor.apply(this, arguments);
  }

  MarkdownViewer.prototype.update = function(value) {
    return MarkdownViewer.__super__.update.call(this, window.markdown.toHTML(value));
  };

  return MarkdownViewer;

})(TemplateViewer);
