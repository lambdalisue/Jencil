###
Jencil editor
###
namespace 'Jencil.editors', (exports) ->
  Widget = Jencil.widgets.Widget
  exports.EditorBase = class EditorBase extends Widget
    ###
    An abstruct class of Jencil editor
    ###
    constructor: (jencil, cls, type) ->
      super jencil, cls, type
    update: ->
      ###
      Update editor. Subclass should override this method to update anything related to the editor
      ###
    getValue: ->
      throw new Error "Subclass must override this method."
    getSelection: ->
      throw new Error "Subclass must override this method."
    setSelection: (start, end) ->
      throw new Error "Subclass must override this method."
    getSelected: ->
      throw new Error "Subclass must override this method."
    replaceSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    insertBeforeSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    insertAfterSelected: (str, select=false) ->
      throw new Error "Subclass must override this method."
    wrapSelected: (before, after, select=false, additional=undefined) ->
      throw new Error "Subclass must override this method."

