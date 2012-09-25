DefaultProfile =
  mainPanelClass: null
  editorClass: null
  viewerClass: null
  helperClass: null
  toolbarButtons: []
  statusbarButtons: []
  defaultVolume: null
  defaultVolume2: null


class @Jencil
  constructor: (textarea, options) ->
    DefaultOptions =
      profile: 'Html',
      profiles: {
        Html: HtmlProfile
        Markdown: MarkdownProfile
      },
      resizable: true,
      enableTabIndent: true,
      enableAutoIndent: true,
      tabString: '\t',
      defaultVolume: null,
      defaultVolume2: null,
      width: 640,
      height: 620,
      editorTemplatePath: null,   # Not used yet
      viewerTemplatePath: null,
      helperTemplatePath: null,
    @options = jQuery.extend(DefaultOptions, options)
    @element = textarea.hide()

    @caretaker = new Caretaker()
    @caretaker.originator = => @editor()

    @wrapper = new Wrapper(@, @options.width, @options.height)
    @fullscreen = new Fullscreen(@)

    @element.after(@wrapper.element).after(@fullscreen.element)

    @wrapper.init()
    @wrapper.adjust()
    @caretaker.save()

  editor: -> @wrapper.workspace.mainPanel.editorPanel or null
  viewer: -> @wrapper.workspace.mainPanel.viewerPanel or null
  helper: -> @wrapper.workspace.mainPanel.helperPanel or null


$.fn.jencil = (options) -> new Jencil($(this), options)


namespace 'Jencil.profiles', (exports) ->
  exports.DefaultProfile = DefaultProfile
namespace 'Jencil.utils.namespace', (exports) ->
  exports.namespace = namespace
namespace 'Jencil.utils.strutils', (exports) ->
  exports.strutils = strutils
namespace 'Jencil.utils.evolution', (exports) ->
  exports.evolute = evolute
namespace 'Jencil.utils.selection', (exports) ->
  exports.Selection = Selection
namespace 'Jencil.utils.animation', (exports) ->
  exports.animate = animate
namespace 'Jencil.utils.autoindent', (exports) ->
  exports.autoIndentable = autoIndentable
namespace 'Jencil.utils.curtain', (exports) ->
  exports.curtainFactory = curtainFactory
namespace 'Jencil.utils.i18n', (exports) ->
  exports.translate = translate
namespace 'Jencil.utils.undo', (exports) ->
  exports.NotImplementedError = NotImplementedError
  exports.Originator = Originator
  exports.Caretaker = Caretaker
namespace 'Jencil', (exports) ->
  exports.t = translate
