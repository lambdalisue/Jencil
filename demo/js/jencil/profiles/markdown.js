(function() {
  namespace('Jencil.profile', function(exports) {
    exports.editor = 'TextEditor';
    exports.previewParserMethod = 'GET';
    exports.previewParserPath = '~/parsers/markdown.cgi';
    exports.previewParserVal = 'data';
    return exports.buttonsets = [['s', 'h1', 'H1', '\n', '\n================================='], ['s', 'h2', 'H2', '\n', '\n---------------------------------'], ['s', 'h3', 'H3', '\n### ', '\n'], ['s', 'h4', 'H4', '\n#### ', '\n'], ['s', 'h5', 'H5', '\n##### ', '\n'], ['s', 'h6', 'H6', '\n###### ', '\n'], ['-'], ['s', 'Bold', 'bold', '**', '**'], ['s', 'Italic', 'italic', '*', '*'], ['-'], ['l', '[{{label}}]({{href}} "{{title}}")'], ['i', '![{{alt}}]({{src}} "{{title}}")'], ['-'], ['u', '*   ', '', '\n', '\n'], ['o', '{{i}}.  ', '', '\n', '\n'], ['-'], ['e', 'quote', 'Quote', '    ', '', '\n', '\n'], ['s', 'code', 'Code', '`', '`'], ['-'], ['p']];
  });
}).call(this);
