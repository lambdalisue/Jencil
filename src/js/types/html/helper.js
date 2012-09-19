var HTML_HELPER_HTML, HtmlHelper,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HTML_HELPER_HTML = "<h1>Keyboard shortcut</h1>\n<p><span class=\"key\">Ctrl+Z</span>Undo<p>\n<p><span class=\"key\">Ctrl+Shift+Z</span>Redo<p>\n<p><span class=\"key\">Ctrl+B</span>Make selected text property as <b>Bold</b><p>\n<p><span class=\"key\">Ctrl+I</span>Make selected text property as <i>Italic</i><p>\n<p><span class=\"key\">Ctrl+U</span>Underline selected text like <u>Underline</u><p>\n<p><span class=\"key\">Ctrl+F</span>Toggle fullscreen mode<p>\n<p><span class=\"key\">Ctrl+Q</span>Toggle quick viewer panel<p>\n<p><span class=\"key\">Ctrl+H</span>Toggle help panel<p>";

HtmlHelper = (function(_super) {

  __extends(HtmlHelper, _super);

  function HtmlHelper(core) {
    HtmlHelper.__super__.constructor.call(this, core);
    this.element.html(HTML_HELPER_HTML);
  }

  return HtmlHelper;

})(Jencil.ui.widgets.helpers.BaseHelper);

namespace('Jencil.ui.widgets.helpers', function(exports) {
  return exports.HtmlHelper = HtmlHelper;
});
