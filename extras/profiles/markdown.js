namespace('Jencil.profile', function(exports) {
  var Profile;
  return exports.Profile = Profile = (function() {
    function Profile() {}
    Profile.prototype.name = 'Markdown Profile';
    Profile.prototype.editor = 'TextEditor';
    Profile.prototype.buttonsets = [['SimpleMarkupButton', 'h1', 'H1', '\n', '\n================================='], ['SimpleMarkupButton', 'h2', 'H2', '\n', '\n---------------------------------'], ['SimpleMarkupButton', 'h3', 'H3', '\n### ', '\n'], ['SimpleMarkupButton', 'h4', 'H4', '\n#### ', '\n'], ['SimpleMarkupButton', 'h5', 'H5', '\n##### ', '\n'], ['SimpleMarkupButton', 'h6', 'H6', '\n###### ', '\n'], ['-'], ['SimpleMarkupButton', 'Bold', 'bold', '**', '**'], ['SimpleMarkupButton', 'Italic', 'italic', '*', '*'], ['-'], ['LinkMarkupButton', '[{{label}}]({{href}} "{{title}}")'], ['ImageMarkupButton', '![{{alt}}]({{src}} "{{title}}")'], ['-'], ['MultilineMarkupButton', 'ul', 'Unordered List', '*   ', '', '', ''], ['MultilineMarkupButton', 'ol', 'Ordered List', '{{i}}.  ', '', '', ''], ['-'], ['MultilineMarkupButton', 'quote', 'Quote', '    ', '', '', ''], ['SimpleMarkupButton', 'code', 'Code', '`', '`'], ['-'], ['PreviewButton']];
    Profile.prototype.extras = {
      previewParserMethod: 'GET',
      previewParserPath: 'cgi-bin/markdown.cgi',
      previewParserVal: 'data'
    };
    return Profile;
  })();
});
