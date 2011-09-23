namespace 'Jencil.profile', (exports) ->
  exports.buttonsets = [
    ['s', 'H1', 'h1', '<h1>', '</h1>']
    ['s', 'H2', 'h2', '<h2>', '</h2>']
    ['s', 'H3', 'h3', '<h3>', '</h3>']
    ['s', 'H4', 'h4', '<h4>', '</h4>']
    ['s', 'H5', 'h5', '<h5>', '</h5>']
    ['s', 'H6', 'h6', '<h6>', '</h6>']
    ['-']
    ['s', 'Quote', 'quote', '<blockquote>', '</blockquote>']
    ['s', 'Bold', 'bold', '<strong>', '</strong>']
    ['s', 'Italic', 'italic', '<em>', '</em>']
    ['-']
    ['l', '<a href="{{href}}" title="{{title}}">{{label}}</a>']
    ['i', '<img src="{{src}}" alt="{{alt}}" title="{{title}}">']
    ['-']
    ['u', '  <li>', '</li>', '<ul>', '</ul>']
    ['o', '  <li>', '</li>', '<ol>', '</ol>']
  ]
