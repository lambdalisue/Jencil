class Profile
  mainPanelClass: null
  editorClass: null
  viewerClass: null
  helperClass: null
  buttons: null

class @Jencil
  constructor: (textarea, options) ->
    @options = jQuery.extend({
      'profile': Jencil.filetypes.html.HtmlProfile,
      'resizable': true,
      'enableTabIndent': true,
      'enableAutoIndent': true,
    }, options)
    @element = textarea.hide()

    @caretaker = new Caretaker()
    @caretaker.originator = => @editor()

    @wrapper = new Wrapper(@)
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
  exports.Profile = Profile
namespace 'Jencil.utils', (exports) ->
  exports.namespace = namespace
