class MonomainPanel
  constructor: (core, profile) ->
    editorPanel = new profile.editorClass(core)
    editorPanel.element.addClass 'mainPanel'
    return editorPanel


class DimainPanel extends VerticalPanel
  constructor: (core, profile) ->
    @editorPanel = new profile.editorClass(core)
    @viewerPanel = new profile.viewerClass(core)
    # call constructor of superclass
    super core, @editorPanel, @viewerPanel, profile.defaultVolume
    @element.addClass 'mainPanel'
    # Connect editorPanel and viewerPanel
    @editorPanel.change (value) => @viewerPanel.update(value)

class TrimainPanel extends HorizontalPanel
  constructor: (core, profile) ->
    @editorPanel = new profile.editorClass(core)
    @viewerPanel = new profile.viewerClass(core)
    @helperPanel = new profile.helperClass(core)
    @verticalPanel = new VerticalPanel core, @editorPanel, @viewerPanel, profile.defaultVolume
    super @verticalPanel, @helperPanel, profile.defaultVolume2
    @element.addClass 'mainPanel'
    # Connect editorPanel and viewerPanel
    @editorPanel.change (value) => @viewerPanel.update(value)

namespace 'Jencil.ui.widgets.panels', (exports) ->
  exports.MonomainPanel = MonomainPanel
  exports.DimainPanel = DimainPanel
  exports.TrimainPanel = TrimainPanel
