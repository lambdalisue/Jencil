class HtmlHelper extends BaseHelper
  constructor: (core) ->
    super core
    HTML_HELPER_HTML = """
    <p><span class="key">Ctrl+Z</span>#{Jencil.t("Undo")}<p>
    <p><span class="key">Ctrl+Shift+Z</span>#{Jencil.t("Redo")}<p>
    <p><span class="key">Ctrl+B</span>#{Jencil.t("Make selected text property as <b>Bold</b>")}<p>
    <p><span class="key">Ctrl+I</span>#{Jencil.t("Make selected text property as <i>Italic</i>")}<p>
    <p><span class="key">Ctrl+U</span>#{Jencil.t("Underline selected text like <u>Underline</u>")}<p>
    <p><span class="key">Ctrl+F</span>#{Jencil.t("Toggle fullscreen mode")}<p>
    <p><span class="key">Ctrl+Q</span>#{Jencil.t("Toggle quick view")}<p>
    <p><span class="key">Ctrl+H</span>#{Jencil.t("Toggle help")}<p>
    """
    # Add content
    @element.html HTML_HELPER_HTML

namespace 'Jencil.ui.widgets.helpers', (exports) ->
  exports.HtmlHelper = HtmlHelper
