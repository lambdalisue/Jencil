###
This is a profile for sample. This profile use `SimpleEditor` which is created at Tutorial.
###
namespace 'Jencil.profile', (exports) ->
  exports.Profile = class Profile
    name: 'PlainText Profile'
    constructor: (jencil) ->
      # if you want to prepare something, use this constructor
    editor: 'SimpleEditor'
    buttonsets: [
      ['s', 'h1', 'H1', '\n', '\n=================================']
      ['s', 'h2', 'H2', '\n', '\n---------------------------------']
      ['s', 'h3', 'H3', '\n### ', '\n']
      ['s', 'h4', 'H4', '\n#### ', '\n']
      ['s', 'h5', 'H5', '\n##### ', '\n']
      ['s', 'h6', 'H6', '\n###### ', '\n']
      ['-']
      ['s', 'Bold', 'bold', '**', '**']
      ['s', 'Italic', 'italic', '*', '*']
      ['-']
      ['l', '[{{label}}]({{href}} "{{title}}")']
      ['i', '![{{alt}}]({{src}} "{{title}}")']
      ['-']
      ['m', 'ul', 'Unordered List', '*   ', '', '\n', '\n']
      ['m', 'ol', 'Ordered List', '{{i}}.  ', '', '\n', '\n']
      ['-']
      ['e', 'quote', 'Quote', '    ', '', '\n', '\n']
      ['s', 'code', 'Code', '`', '`']
    ]
