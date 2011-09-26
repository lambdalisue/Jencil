namespace 'Jencil.profile', (exports) ->
  exports.Profile = class Profile
    name: 'WYSIWYG HTML Profile'
    constructor: (jencil) ->
      # if you want to prepare something, use this constructor
    editor: 'RichEditor'
    buttonsets: [
      ['CommandButton', 'h1', 'H1', 'heading', '1']
      ['CommandButton', 'h2', 'H2', 'heading', '2']
      ['CommandButton', 'h3', 'H3', 'heading', '3']
      ['-']
      ['CommandButton', 'bold', 'Bold', 'bold', undefined ]
      ['CommandButton', 'italic', 'Italic', 'italic', undefined]
      ['CommandButton', 'underline', 'Underline', 'underline', undefined]
      ['CommandButton', 'strikethrough', 'Strike', 'strikethrough', undefined]
      ['-']
      ['CommandButton', 'subscript', 'Subscript', 'subscript', undefined]
      ['CommandButton', 'superscript', 'Superscript', 'superscript', undefined]
      ['-']
      ['CommandButton', 'ul', 'Unordered List', 'insertUnorderedList', undefined]
      ['CommandButton', 'ol', 'Ordered List', 'insertOrderedList', undefined]
      ['-']
      ['PromptCommandButton', 'link', 'Link', 'insertLink', 'Please input link url']
      ['PromptCommandButton', 'image', 'Image', 'insertImage', 'Please input image url']
      ['-']
      ['CommandButton', 'indent', 'Indent', 'indent', undefined]
      ['CommandButton', 'outdent', 'Outdent', 'outdent', undefined]
      ['-']
      ['CommandButton', 'justify-left', 'Align left', 'justifyLeft', undefined]
      ['CommandButton', 'justify-center', 'Align center', 'justifyCenter', undefined]
      ['CommandButton', 'justify-right', 'Align right', 'justifyRight', undefined]
      ['CommandButton', 'justify-full', 'Justify', 'justifyFull', undefined]
      ['-']
      ['CommandButton', 'undo', 'Undo', 'undo', undefined]
      ['CommandButton', 'redo', 'Redo', 'redo', undefined]
      ['RawviewButton']
    ]
