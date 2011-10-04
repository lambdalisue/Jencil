namespace 'Jencil.profile', (exports) ->
  exports.Profile = class Profile
    name: 'Markdown Profile'
    editor: 'TextEditor'
    buttonsets: [
      ['SimpleMarkupButton', 'h1', 'H1', '\n', '\n=================================']
      ['SimpleMarkupButton', 'h2', 'H2', '\n', '\n---------------------------------']
      ['SimpleMarkupButton', 'h3', 'H3', '\n### ', '\n']
      ['SimpleMarkupButton', 'h4', 'H4', '\n#### ', '\n']
      ['SimpleMarkupButton', 'h5', 'H5', '\n##### ', '\n']
      ['SimpleMarkupButton', 'h6', 'H6', '\n###### ', '\n']
      ['-']
      ['SimpleMarkupButton', 'Bold', 'bold', '**', '**']
      ['SimpleMarkupButton', 'Italic', 'italic', '*', '*']
      ['-']
      ['LinkMarkupButton', '[{{label}}]({{href}} "{{title}}")']
      ['ImageMarkupButton', '![{{alt}}]({{src}} "{{title}}")']
      ['-']
      ['MultilineMarkupButton', 'ul', 'Unordered List', '*   ', '', '', '']
      ['MultilineMarkupButton', 'ol', 'Ordered List', '{{i}}.  ', '', '', '']
      ['-']
      ['MultilineMarkupButton', 'quote', 'Quote', '    ', '', '', '']
      ['SimpleMarkupButton', 'code', 'Code', '`', '`']
      ['-']
      ['PreviewButton']
    ]
    extras:
      # TextEditor extra profile
      previewParserMethod: 'GET'
      previewParserPath: '~/parsers/markdown.cgi'
      previewParserVal: 'data'
