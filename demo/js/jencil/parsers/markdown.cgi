#!/usr/bin/env python
# :vim set fileencoding=utf8:
import cgi
import cgitb
import markdown
cgitb.enable()

print "Content-Type: text/html"
print

form = cgi.FieldStorage()
if 'data' not in form:
    print "<h1>Markdown Online Parser</h1>"
    print "<h2>Usage</h2>"
    print "   Access <a href=\"?data=**Markdown**\">?data=**Markdown**</a>"
    return

data = form.getvalue('data', '')
html = markdown.markdown(data)

print html
