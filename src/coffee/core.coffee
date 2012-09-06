class JencilCore
  constructor: (textarea) ->
    # memento caretaker
    @caretaker = new Caretaker()
    # profile
    @profile = new MarkdownProfile()
    # DOM
    @element = textarea
    @element.hide()
    @fullscreen = new Fullscreen(@)
    @wrapper = new Wrapper(@)
    @element.after @fullscreen.element
    @element.after @wrapper.element
    # Add events
    @update (value) =>
      # update actual textarea
      @element.val(value)
    $(window).resize => @adjust()

    @init().adjust()

  setProfile: (profile) ->
    @wrapper.workspace.reconstructor(profile)

  getEditor: ->
    return @wrapper.workspace.editorPanel

  getViewer: ->
    return @wrapper.workspace.viewerPanel

  init: ->
    @wrapper.init()
    return @

  adjust: ->
    @wrapper.adjust()
    return @

  focus: ->
    @getEditor().focus()
    return @

  update: (callback) ->
    editor = @getEditor()
    if callback?
      editor.update(callback)
      return @
    @editor.update()
    return @

  options:
    defaultSplitterVolume: 1
    previewTemplatePath: null

$.fn.jencil = (options) ->
  $this = $(this)
  instance = new JencilCore($this)
  $this.data('jencil', instance)
