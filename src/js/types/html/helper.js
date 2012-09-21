var HtmlHelper,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HtmlHelper = (function(_super) {

  __extends(HtmlHelper, _super);

  function HtmlHelper(core) {
    var HTML_HELPER_HTML;
    HtmlHelper.__super__.constructor.call(this, core);
    HTML_HELPER_HTML = "<p><span class=\"key\">Ctrl+Z</span>" + (Jencil.t("Undo")) + "<p>\n<p><span class=\"key\">Ctrl+Shift+Z</span>" + (Jencil.t("Redo")) + "<p>\n<p><span class=\"key\">Ctrl+B</span>" + (Jencil.t("Make selected text property as <b>Bold</b>")) + "<p>\n<p><span class=\"key\">Ctrl+I</span>" + (Jencil.t("Make selected text property as <i>Italic</i>")) + "<p>\n<p><span class=\"key\">Ctrl+U</span>" + (Jencil.t("Underline selected text like <u>Underline</u>")) + "<p>\n<p><span class=\"key\">Ctrl+F</span>" + (Jencil.t("Toggle fullscreen mode")) + "<p>\n<p><span class=\"key\">Ctrl+Q</span>" + (Jencil.t("Toggle quick view")) + "<p>\n<p><span class=\"key\">Ctrl+H</span>" + (Jencil.t("Toggle help")) + "<p>";
    this.element.html(HTML_HELPER_HTML);
  }

  return HtmlHelper;

})(Jencil.ui.widgets.helpers.BaseHelper);

namespace('Jencil.ui.widgets.helpers', function(exports) {
  return exports.HtmlHelper = HtmlHelper;
});
