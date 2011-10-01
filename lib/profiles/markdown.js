namespace('Jencil.profile', function(exports) {
  var Profile;
  return exports.Profile = Profile = (function() {
    Profile.prototype.name = 'Markdown Profile';
    function Profile(jencil) {
      this.extras.previewParserPath = jencil.abspath(this.extras.previewParserPath);
    }
    Profile.prototype.editor = 'TextEditor';
    Profile.prototype.buttonsets = [['s', 'h1', 'H1', '\n', '\n================================='], ['s', 'h2', 'H2', '\n', '\n---------------------------------'], ['s', 'h3', 'H3', '\n### ', '\n'], ['s', 'h4', 'H4', '\n#### ', '\n'], ['s', 'h5', 'H5', '\n##### ', '\n'], ['s', 'h6', 'H6', '\n###### ', '\n'], ['-'], ['s', 'Bold', 'bold', '**', '**'], ['s', 'Italic', 'italic', '*', '*'], ['-'], ['l', '[{{label}}]({{href}} "{{title}}")'], ['i', '![{{alt}}]({{src}} "{{title}}")'], ['-'], ['m', 'ul', 'Unordered List', '*   ', '', '', ''], ['m', 'ol', 'Ordered List', '{{i}}.  ', '', '', ''], ['-'], ['m', 'quote', 'Quote', '    ', '', '', ''], ['s', 'code', 'Code', '`', '`'], ['-'], ['PreviewButton']];
    Profile.prototype.extras = {
      previewParserMethod: 'GET',
      previewParserPath: '~/parsers/markdown.cgi',
      previewParserVal: 'data'
    };
    return Profile;
  })();
});