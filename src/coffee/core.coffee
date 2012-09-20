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
    @options = jQuery.extend({
      'profile': 'Html',
      'profiles': {
        'Html': Jencil.profiles.HtmlProfile
      },
      'resizable': true,
      'enableTabIndent': true,
      'enableAutoIndent': true,
      'tabString': '    ',
      'defaultVolume': null,
      'defaultVolume2': null,
      'width': 640,
      'height': 620,
      'editorTemplatePath': null,   # Not used yet
      'viewerTemplatePath': null,
      'helperTemplatePath': null,
    }, options)
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

namespace 'Jencil.utils', (exports) ->
  exports.namespace = namespace

namespace 'Jencil', (exports) ->
  exports.t = translate
