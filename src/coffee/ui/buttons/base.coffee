class Separator extends Widget
  constructor: (core) ->
    super core, '<span>'
    @element.addClass 'separator'


class Button extends Widget
  constructor: (core, @name) ->
    super core, '<a>'
    @element.addClass('button').addClass(name)
    @element.append($("<span>#{name}</span>"))
    @element.attr 'title', name


class ActionButton extends Button
  constructor: (core, name, @callback, @shortcut) ->
    super core, name
    @element.click => @callback()

    if @shortcut? and window.shortcut?
      # it require `shortcut.js`
      window.shortcut.add @shortcut, => 
        @callback()
      @element.attr 'title', "#{name} (#{@shortcut})"


class CommandButton extends ActionButton
  constructor: (core, name, @command, shortcut) ->
    callback = => @core.caretaker.invoke @command
    super core, name, callback, shortcut


class EditorMarkupButton extends CommandButton
  constructor: (core, name, shortcut) ->
    command = new EditorMarkupCommand(core, name)
    super core, name, command, shortcut
