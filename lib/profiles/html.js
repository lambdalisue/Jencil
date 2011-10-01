namespace('Jencil.profile', function(exports) {
  var Profile;
  return exports.Profile = Profile = (function() {
    Profile.prototype.name = 'HTML Profile';
    function Profile(jencil) {}
    Profile.prototype.editor = 'TextEditor';
    Profile.prototype.buttonsets = [['s', 'h1', 'H1', '<h1>', '</h1>'], ['s', 'h2', 'H2', '<h2>', '</h2>'], ['s', 'h3', 'H3', '<h3>', '</h3>'], ['s', 'h4', 'H4', '<h4>', '</h4>'], ['s', 'h5', 'H5', '<h5>', '</h5>'], ['s', 'h6', 'H6', '<h6>', '</h6>'], ['-'], ['s', 'bold', 'Bold', '<strong>', '</strong>'], ['s', 'italic', 'Italic', '<em>', '</em>'], ['-'], ['l', '<a href="{{href}}" title="{{title}}">{{label}}</a>'], ['i', '<img src="{{src}}" alt="{{alt}}" title="{{title}}">'], ['-'], ['m', 'ul', 'Unordered List', '  <li>', '</li>', '<ul>', '</ul>'], ['m', 'ol', 'Ordered List', '  <li>', '</li>', '<ol>', '</ol>'], ['-'], ['s', 'quote', 'Quote', '<quote>', '</quote>'], ['s', 'code', 'Code', '<code>', '</code>'], ['-'], ['PreviewButton']];
    return Profile;
  })();
});