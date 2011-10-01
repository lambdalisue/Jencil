namespace 'Jencil.profile', (exports) ->
  exports.Profile = class Profile
    name: 'WYSIWYG HTML Profile'
    constructor: (jencil) ->
      # if you want to prepare something, use this constructor
    editor: 'RichEditor'
    buttonsets: [
      ['CommandButton', 'h1', 'H1', 'h1']
      ['CommandButton', 'h2', 'H2', 'h2']
      ['CommandButton', 'h3', 'H3', 'h3']
      ['-']
      ['CommandButton', 'bold', 'Bold', 'strong']
      ['CommandButton', 'italic', 'Italic', 'em']
      ['CommandButton', 'underline', 'Underline', 'ins']
      ['CommandButton', 'strikethrough', 'Strike', 'del']
      ['-']
      ['CommandButton', 'subscript', 'Subscript', 'sub']
      ['CommandButton', 'superscript', 'Superscript', 'sup']
      ['-']
      ['CommandButton', 'ul', 'Unordered List', 'ul']
      ['CommandButton', 'ol', 'Ordered List', 'ol']
      ['-']
      ['PromptCommandButton', 'link', 'Link', 'a', 'Please input link url']
      ['PromptCommandButton', 'image', 'Image', 'img', 'Please input image url']
      ['-']
      ['CommandButton', 'indent', 'Indent', 'indent']
      ['CommandButton', 'outdent', 'Outdent', 'outdent']
      ['-']
      ['CommandButton', 'justify-left', 'Align left', 'justifyleft']
      ['CommandButton', 'justify-center', 'Align center', 'justifycenter']
      ['CommandButton', 'justify-right', 'Align right', 'justifyright']
      ['CommandButton', 'justify-full', 'Justify', 'justifyfull']
      ['-']
      #['CommandButton', 'undo', 'Undo', 'undo']
      #['CommandButton', 'redo', 'Redo', 'redo']
      ['RawviewButton']
    ]
