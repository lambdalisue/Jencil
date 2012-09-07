class Separator extends Widget
  constructor: (core) ->
    super core, '<span>'
    @element.addClass 'separator'


class Button extends Widget
  constructor: (core, @name, @title) ->
    super core, '<a>'
    @element.addClass('button').addClass(name)
    @element.append($("<span>#{name}</span>"))
    if @title?
      if $.i18n? and $.t?
        @title = $.t(@title)
      @element.attr 'title', @title


class ActionButton extends Button
  constructor: (core, name, title, @callback, @shortcut) ->
    super core, name, title
    @element.click => @callback()

    if @shortcut? and window.shortcut?
      # it require `shortcut.js`
      window.shortcut.add @shortcut, => 
        @callback()
      @element.attr 'title', "#{name} (#{@shortcut})"


class CommandButton extends ActionButton
  constructor: (core, name, title, @command, shortcut) ->
    callback = => @core.caretaker.invoke @command
    super core, name, title, callback, shortcut


class EditorMarkupButton extends CommandButton
  constructor: (core, name, title, shortcut) ->
    command = new EditorMarkupCommand(core, name)
    super core, name, title, command, shortcut
