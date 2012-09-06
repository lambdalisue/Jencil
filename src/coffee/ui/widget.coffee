class Widget
  constructor: (@core, selector='<div>', context) ->
    if selector instanceof jQuery
      @element = selector
    else
      @element = jQuery(selector, context)
    # return stored instance in the DOM element
    instance = @element.data('widget-instance')
    if instance? and instance instanceof Widget
      return instance
    @element.data('widget-instance', @)

  factory: (jQueryObj) ->
    return new Widget(@core, jQueryObj)

  parent: ->
    if @_parentCache?
      return @_parentCache
    @_parentCache = @factory @element.parent()
    return @_parentCache

  children: ->
    if @_childrenCache?
      return @_childrenCache
    @_childrenCache = (@factory(jQuery(c)) for c in @element.children())
    return @_childrenCache

  init: ->
    # call init method of all childrens
    child.init() for child in @children()
    return @adjust()

  adjust: ->
    # call adjust method of all childrens
    child.adjust() for child in @children()
    return @
