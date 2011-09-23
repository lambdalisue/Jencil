(function() {
  this.JencilProfile = (function() {
    function JencilProfile() {}
    JencilProfile.prototype.buttons = [['simplewrap', 'H1', 'h1', '<h1>', '</h1>'], ['simplewrap', 'H2', 'h2', '<h2>', '</h2>'], ['simplewrap', 'H3', 'h3', '<h3>', '</h3>'], ['simplewrap', 'H4', 'h4', '<h4>', '</h4>'], ['simplewrap', 'H5', 'h5', '<h5>', '</h5>'], ['simplewrap', 'H6', 'h6', '<h6>', '</h6>'], ['-'], ['simplewrap', 'Quote', 'quote', '<blockquote>', '</blockquote>'], ['simplewrap', 'Bold', 'bold', '<strong>', '</strong>'], ['simplewrap', 'Italic', 'italic', '<em>', '</em>'], ['-'], ['link', '<a href="{href}" title="{title}">{label}</a>'], ['img', '<img src="{src}" title="{title}" alt="{alt}">']];
    return JencilProfile;
  })();
}).call(this);
