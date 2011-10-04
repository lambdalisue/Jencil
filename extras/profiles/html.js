namespace('Jencil.profile', function(exports) {
  var Profile;
  return exports.Profile = Profile = (function() {
    Profile.prototype.name = 'HTML Profile';
    function Profile(jencil) {}
    Profile.prototype.editor = 'TextEditor';
    Profile.prototype.buttonsets = [['SimpleMarkupButton', 'h1', 'H1', '<h1>', '</h1>'], ['SimpleMarkupButton', 'h2', 'H2', '<h2>', '</h2>'], ['SimpleMarkupButton', 'h3', 'H3', '<h3>', '</h3>'], ['SimpleMarkupButton', 'h4', 'H4', '<h4>', '</h4>'], ['SimpleMarkupButton', 'h5', 'H5', '<h5>', '</h5>'], ['SimpleMarkupButton', 'h6', 'H6', '<h6>', '</h6>'], ['-'], ['SimpleMarkupButton', 'bold', 'Bold', '<strong>', '</strong>'], ['SimpleMarkupButton', 'italic', 'Italic', '<em>', '</em>'], ['-'], ['LinkMarkupButton', '<a href="{{href}}" title="{{title}}">{{label}}</a>'], ['ImageMarkupButton', '<img src="{{src}}" alt="{{alt}}" title="{{title}}">'], ['-'], ['MultilineMarkupButton', 'ul', 'Unordered List', '  <li>', '</li>', '<ul>', '</ul>'], ['MultilineMarkupButton', 'ol', 'Ordered List', '  <li>', '</li>', '<ol>', '</ol>'], ['-'], ['SimpleMarkupButton', 'quote', 'Quote', '<quote>', '</quote>'], ['SimpleMarkupButton', 'code', 'Code', '<code>', '</code>'], ['-'], ['PreviewButton']];
    return Profile;
  })();
});