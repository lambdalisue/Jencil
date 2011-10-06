#!/usr/bin/env python
# :vim set fileencoding=utf8:
import cgi
print "Content-Type: text/html"
print
try:
    import markdown
except ImportError:
    print "<h1>Markdown Parse Could not work</h1>"
    print "You have to install markdown with the following command first!"
    print "<pre>pip install markdown</pre>"

form = cgi.FieldStorage()
if 'data' not in form:
    print "<h1>Markdown Online Parser</h1>"
    print "<h2>Usage</h2>"
    print "   Access <a href=\"?data=**Markdown**\">?data=**Markdown**</a>"
else:
    data = form.getvalue('data', '')
    html = markdown.markdown(data)
    print html
