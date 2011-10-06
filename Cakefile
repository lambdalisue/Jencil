#
# CoffeeScript Project Utils
#
# Author: Alisue (lambdalisue@hashnote.net - http://hashnote.net)
# License: MIT License
#
# Required:
#   - node.js
#   - coffee-script: npm install coffee-script
#   - docco: npm install docco
#   - vows: npm install vows
#   - gcc (Google Closure Compiler) - http://code.google.com/closure/compiler/
#     extract downloaded files to $HOME/.app/compiler-latest
#
fs              = require 'fs'
path            = require 'path'
util            = require 'util'
{spawn, exec}   = require 'child_process'

VERSION = 'v0.0.2rc2'
NAME = 'jencil'
CS = 'src'
JS = 'lib'
DEMO = 'demo'
TEST = 'test'
SPEC = 'spec'
FILES = [
  'utils/detector',
  'utils/namespace',
  'utils/dynamicloader',
  'core/jencil.core',
  'core/jencil.utils',
  'core/jencil.options',
  'core/jencil.profile',
  'core/jencil.theme',
  'core/jencil.widget',
  'core/jencil.button',
  'core/jencil.editor',
  'core/jencil.editor.pane',
  'editors/jencil.texteditor',
  'editors/jencil.richeditor',
]
REQUIRES = [
  'requires/textarea.min.js',
  'requires/richarea.min.js',
  'requires/jquery.textarea.js',
]
HEADER = """
Jencil - A JavaScript Cross-browser WYSIWYM and WYSIWYG editor #{VERSION}
http://lambdalisue.github.com/Jencil

Copyright 2011 (c) hashnote.net, Alisue allright reserved.
Licensed under the MIT license.

Dependencies:
- jQuery v1.4.2
  http://jquery.com/
- Tabby jQuery plugin v0.12
  http://teddevito.com/demos/textarea.html
- Textarea v0.1.0 (included)
  http://demos.textarea.hashnote.net/
- Richarea v0.1.1 (included)
  http://demos.richarea.hashnote.net/

Includes Tabby jQuery plugin v0.12
  http://teddevito.com/demos/textarea.html
  Copyright (c) 2009 Ted Devito

Includes Textarea v0.1.0
  http://demos.textarea.hashnote.net/
  Copyright (c) 2011 hashnote.net, Alisue allright reserved

Includes Richarea v0.1.1 (included)
  http://demos.richarea.hashnote.net/
  Copyright (c) 2011 hashnote.net, Alisue allright reserved

Last-Modified: #{(new Date).toUTCString()}
"""
GCC = '$HOME/.app/compiler-latest/compiler.jar'

class reporter
  @RESET: '\033[0m'
  @BOLD: '\033[0;1m'
  @GREEN: '\033[0;32m'
  @RED: '\033[0;31m'
  @MAGENTA: '\033[0;35m'
  @TICK: '\u2713'
  @CROSS: '\u2613'
  @_write: (color, message, args) ->
    message = "#{color}#{message}#{reporter.RESET}" if color?
    console.log.apply @, ([message].concat args)
  @_writeError: (color, message, args) ->
     message = "#{color}#{message}#{reporter.RESET}" if color?
     console.error.apply @, ([message].concat args)
  @_now: ->
    date = new Date
    "#{date.getHours()}:#{date.getMinutes()}:#{date.getSeconds()}"
  @log: (message='', args...) ->
     reporter._write null, message, args
  @info: (message, args...) ->
     reporter._write reporter.GREEN, message, args
  @head: (message, args...) ->
     reporter._write reporter.BOLD, message, args
  @warn: (message, args...) ->
     reporter._writeError reporter.MAGENTA, message, args
  @error: (message, args...) ->
     reporter._writeError reporter.RED, message, args
  @success: (message, args...) ->
     reporter._write null, "[#{reporter._now()}] #{reporter.GREEN}#{reporter.TICK}  #{message}#{reporter.RESET}", args
  @fail: (message, args...) ->
     reporter._write null, "[#{reporter._now()}] #{reporter.RED}#{reporter.CROSS}  #{message}#{reporter.RESET}", args

option '-v', '--verbose', 'display full information to stdout/stderr'
option '-w', '--watch', 'continuously compile or test (available on compile:debug, compile:release and test:spec)'

if HEADER?
  CS_HEADER = "###!\n#{HEADER}\n###\n"
  JS_HEADER = (" * #{line}" for line in HEADER.split '\n')
  JS_HEADER = "/*!\n#{JS_HEADER.join '\n'}\n */"
else
  CS_HEADER = JS_HEADER = ''

# If #{NAME} in FILES, this Cakefile will destroy that file so throw error
if "#{NAME}" in FILES 
  reporter.warn "'#{CS}/#{NAME}.coffee' is in FILES. this file will automatically overwrite with this script"
  reporter.warn "so please change that file name to like '#{CS}/#{NAME}.core.coffee' or whatever"
  process.exit 1

# get reason line from error string
reason = (error) ->
  m = "#{error}".match /Error: (.*)/
  return if m? then " - #{m[1]}" else ''
# prepend data to file
prepend = (file, data, encoding='utf8') ->
  content = fs.readFileSync file, encoding
  content = "#{data}\n#{content}"
  fs.writeFileSync file, content, encoding
# check coffeescript files 
check = (files, callback) ->
  _check = (files, callback, index=0, failures=0) ->
    if index is files.length
      return callback failures
    file = files[index]
    if not path.existsSync file
      reporter.fail "#{file} - File not found"
      failures++
      _check files, callback, index, failures
    else
      exec "coffee -cp #{file}", (error, stdout, stderr) ->
        if not error?
          reporter.success file
        else
          reporter.fail "#{file}#{reason stderr}"
          failures++
        index++
        _check files, callback, index, failures
  _check files, callback
# minify single javascript file from src to dst
minify = (src, dst, options, callback) ->
  exec "java -jar \"#{GCC}\" --js #{src} --js_output_file #{dst}", (error, stdout, stderr) ->
    if not error?
      prepend dst, JS_HEADER
      reporter.success "#{src} => #{dst}"
    else
      reporter.fail "#{src} => #{dst}#{reason stderr}"
      reporter.error stderr if options.verbose?
    callback? if error then 1 else 0
compile =
  # compile a single coffeescript to a single javascript
  single: (src, dst, options, callback) ->
    out = path.dirname dst
    exec "coffee -bc -o #{out} #{src}", (error, stdout, stderr) ->
      if not error?
        reporter.success "#{src} ---> #{dst}"
      else
        reporter.fail "#{src} ---> #{dst}#{reason stderr}"
        reporter.error stderr if options.verbose?
      callback? if error? then 1 else 0
  # compile coffeescript files to a single javascript (dst)
  join: (files, dst, options, callback) ->
    exec "coffee -cj #{dst} #{files.join ' '}", (error, stdout, stderr) ->
      if not error?
        prepend dst, JS_HEADER
        reporter.success "===> #{dst}"
      else
        reporter.fail "===> #{dst}#{reason stderr}"
        reporter.error stderr if options.verbose?
      callback? if error? then 1 else 0
  # compile coffeescript files in src to javascript files in dst
  debug: (files, src, dst, options, callback) ->
    failures = 0
    remaining = files.length
    for file in files
      compile.single "#{src}/#{file}.coffee", "#{dst}/#{file}.js", options, (_failures) ->
        failures += _failures
        callback? failures if not --remaining
  # compile coffeescript files in src to a single javascript file (dst)
  release: (files, src, dst, options, callback) ->
    files = ("#{src}/#{file}.coffee" for file in files)
    check files, (failures) ->
      if failures is 0
        compile.join files, dst, options, callback
      else
        reporter.error "===> #{dst}"
        callback? failures
pack = 
  # pack files to dst
  pack: (files, dst, options, callback) ->
    read = (file, callback) ->
      fs.readFile file, (error, data) ->
        if not error?
          reporter.success "#{file}"
        else
          reporter.fail "#{file}#{reason error}"
          reporter.error error if options.verbose?
        callback? error, data
    complete = (content, failures) ->
      if failures is 0
        fs.writeFileSync dst, content, 'utf8'
        reporter.success "===> #{dst}"
      else
        reporter.fail "===> #{dst}"
      callback? failures
    contents = []
    failures = 0
    remaining = files.length
    for file, index in files then do (file, index) ->
      read file, (error, data) ->
        contents[index] = data if not error?
        failures++ if error?
        complete contents.join('\n'), failures if not --remaining
  # pack coffeescript files to dst with header
  coffeescript: (files, dst, options, callback) ->
    pack.pack files, dst, options, (failures) ->
      if failures is 0
        prepend dst, CS_HEADER
      callback? failures
  # pack javascript files to dst with header
  javascript: (files, dst, options, callback) ->
    pack.pack files, dst, options, (failures) ->
      if failures is 0
        prepend dst, JS_HEADER
      callback? failures
watch =
  # watch for changes on coffeescript for debug
  debug: (files, src, dst, options) ->
    compile.debug files, src, dst, options
    for file in files then do (file) ->
      srcf = "#{src}/#{file}.coffee"
      dstf = "#{dst}/#{file}.js"
      fs.watchFile srcf, (curr, prev) ->
        compile.single srcf, dstf, options
  # watch for changes on coffeescript for release
  release: (files, src, dst, options) ->
    compile.release files, src, dst, options
    files = ("#{src}/#{file}.coffee" for file in files)
    for file in files then do (file) ->
      fs.watchFile file, (curr, prev) ->
        compile.join files, dst, options
# === watch task
task 'watch:debug', 'watch for changes on coffeescript files and continuously compile the file', (options) ->
  reporter.head 'watching for changes on coffeescript files and continuously compile the files ...'
  reporter.log()
  watch.debug FILES, CS, JS, options
task 'watch:release', 'watch for changes on coffeescript files and continuously compile the file', (options) ->
  reporter.head 'watching for changes on coffeescript files and continuously compile a single joined javascript file ...'
  reporter.log()
  watch.release FILES, CS, "#{JS}/#{NAME}.js", options
# === compile task
task 'compile:debug', 'compile coffeescript files to javascript files', (options) ->
  if options.watch?
    invoke 'watch:debug'
    return
  reporter.head 'compiling coffeescript files to javascript files ...'
  reporter.log()
  compile.debug FILES, CS, JS, options, (failures) ->
    reporter.log()
    if failures is 0
      reporter.info 'successfully complete'
    else
      reporter.error "there are #{failures} error exists. fix these and try again."
task 'compile:release', 'compile coffeescript files to a single javascript file', (options) ->
  if options.watch?
    invoke 'watch:release'
    return
  reporter.head 'compiling coffeescript files to a single javascript file ...'
  reporter.log()
  compile.release FILES, CS, "#{JS}/#{NAME}.js", options, (failures) ->
    reporter.log()
    if failures is 0
      reporter.info 'successfully complete'
    else
      reporter.error "there are #{failures} error exists. fix these and try again."
# === pack task
task 'pack:coffee', 'pack coffeescript files to a single coffeescript file', (options) ->
  reporter.head 'pack coffeescript files to a single coffeescript file ...'
  reporter.log()
  files = ("#{CS}/#{file}.coffee" for file in FILES)
  dst = "#{CS}/#{NAME}.coffee"
  pack.coffeescript files, dst, options, (failures) ->
    reporter.log()
    if failures is 0
      reporter.info 'successfully complete'
    else
      reporter.error "there are #{failures} error exists. fix these and try again."
task 'pack:requires', 'pack compile coffeescript files to a single javascript file', (options) ->
  reporter.head 'pack compiled javascript file with required javascript files ...'
  reporter.log()
  files = REQUIRES.concat ["#{JS}/#{NAME}.js"]
  dst = "#{JS}/#{NAME}.full.js"
  pack.javascript files, dst, options, (failures) ->
    reporter.log()
    if failures is 0
      reporter.info 'successfully complete'
    else
      reporter.error "there are #{failures} error exists. fix these and try again."
# === release task
task 'build', 'invoke compile:release, pack:requires and minify the result javascript', (options) ->
  complete = (failures) ->
    reporter.log()
    if failures is 0
      reporter.info 'successfully complete'
    else
      reporter.error "there are #{failures} error exists. fix these and try again."
  step3 = (failures) ->
    reporter.log()
    if failures is 0
      src = "#{JS}/#{NAME}.full.js"
      dst = "#{JS}/#{NAME}.min.js"
      reporter.head 'minify packed javascript file ...'
      reporter.log()
      minify src, dst, options, complete
    else
      reporter.error "there are #{failures} error exists. fix these and try again."
  step2 = (failures) ->
    reporter.log()
    if failures is 0
      src = REQUIRES.concat ["#{JS}/#{NAME}.js"]
      dst = "#{JS}/#{NAME}.full.js"
      reporter.head 'pack compiled javascript file with required javascript files ...'
      reporter.log()
      pack.javascript src, dst, options, step3
    else
      reporter.error "there are #{failures} error exists. fix these and try again."
  files = FILES
  src = CS
  dst = "#{JS}/#{NAME}.js"
  reporter.head 'compiling coffeescript files to a single javascript file ...'
  reporter.log()
  compile.release files, src, dst, options, step2
task 'clean', 'clean generated javascript files and html files', ->
  reporter.head 'clean generated coffeescript file, javascript files and html files ...'
  reporter.log()
  files = ("\"#{JS}/#{file}.js\"" for file in FILES)
  files.push "\"#{JS}/#{NAME}.js\""
  files.push "\"#{JS}/#{NAME}.full.js\""
  files.push "\"#{JS}/#{NAME}.min.js\""
  files.concat ("\"docs/#{path.basename file}.html\"" for file in FILES)
  exec "rm -r #{files.join ' '}", (error, stdout, stderr) ->
    if not error?
      reporter.info 'successfully complete'
    else
      reporter.error stderr
      process.exit 1
# === document task
task 'docs', 'generate annotated source code with docco', (options) ->
  reporter.head 'generating annotated source codes from coffeescript files ...'
  reporter.log()
  complete = (failures) ->
    reporter.log()
    if failures is 0
      reporter.info 'successfully complete'
    else
      reporter.error "there are #{failures} error exists. fix these error and try again."
      process.exit 1
  failures = 0
  remaining = FILES.length
  for file in FILES then do (file) ->
    src = "#{CS}/#{file}.coffee"
    dst = "docs/#{path.basename file}.html"
    exec "docco #{src}", (error, stdout, stderr) ->
      if not error?
        reporter.success "#{src} ---> #{dst}"
      else
        reporter.fail "#{src} ---> #{dst}#{reason stderr}"
        reporter.error stderr if options.verbose?
        failures++
      complete failures if not --remaining
# === test task
task 'demo', 'start demo server on 0.0.0.0:8000 via python SimpleHTTPServer', (options) ->
  reporter.head 'start demo server on 0.0.0.0:8000 ...'
  proc = spawn 'python', ['-m', 'CGIHTTPServer'], {'cwd': DEMO}
  proc.stdout.on 'data', (data) ->
    process.stdout.write data
  proc.stderr.on 'data', (data) ->
    process.stdout.write data
  proc.on 'exit', (status) ->
    process.exit 1 if status isnt 0
task 'test:spec', 'run spec tests for behavior driving development via vows', (options) ->
  reporter.head 'running all spec tests (spec_***.*) for behavior driving development via vows ...'
  reporter.log()
  args = ("#{SPEC}/#{file}" for file in fs.readdirSync SPEC when /^spec_.*\..*/.test file)
  args.unshift '--spec'
  args.unshift '--watch' if options.watch?
  proc = spawn 'vows', args
  proc.stdout.on 'data', (buffer) ->
    process.stdout.write buffer
  proc.stderr.on 'data', (buffer) ->
    reporter.error buffer
  proc.on 'exit', (status) ->
    process.exit(1) if status isnt 0
task 'test:unit', 'run unit tests for test driving development via nodeunit', (options) ->
  reporter.head 'running all unit tests (test_***.*) for test driving development via nodeunit ...'
  reporter.log()
  args = ("#{TEST}/#{file}" for file in fs.readdirSync TEST when /^test_.*\..*/.test file)
  proc = spawn 'nodeunit', args
  proc.stdout.on 'data', (buffer) ->
    process.stdout.write buffer
  proc.stderr.on 'data', (buffer) ->
    reporter.error buffer
  proc.on 'exit', (status) ->
    process.exit(1) if status isnt 0
