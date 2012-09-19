HTML_HELPER_HTML = """
<h1>Keyboard shortcut</h1>
<p><span class="key">Ctrl+Z</span>Undo<p>
<p><span class="key">Ctrl+Shift+Z</span>Redo<p>
<p><span class="key">Ctrl+B</span>Make selected text property as <b>Bold</b><p>
<p><span class="key">Ctrl+I</span>Make selected text property as <i>Italic</i><p>
<p><span class="key">Ctrl+U</span>Underline selected text like <u>Underline</u><p>
<p><span class="key">Ctrl+F</span>Toggle fullscreen mode<p>
<p><span class="key">Ctrl+Q</span>Toggle quick viewer panel<p>
<p><span class="key">Ctrl+H</span>Toggle help panel<p>
"""
class HtmlHelper extends Jencil.ui.widgets.helpers.BaseHelper
  constructor: (core) ->
    super core
    # Add content
    @element.html HTML_HELPER_HTML

namespace 'Jencil.ui.widgets.helpers', (exports) ->
  exports.HtmlHelper = HtmlHelper
