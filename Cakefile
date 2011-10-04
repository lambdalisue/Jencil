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

VERSION = 'v0.0.2'
NAME = 'jencil'
CS = 'src'
JS = 'lib'
DEMO = 'demo'
TEST = 'test'
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
  'src/libs/Textarea/lib/textarea.min.js',
  'src/libs/Richarea/lib/richarea.min.js',
]
HEADER = """
Jencil #{VERSION}

Javascript cross-browser WYSIWYM and WYSIWYG editor written in CoffeeScript

Author: Alisue (lambdalisue@hashnote.net)
Version: #{VERSION}
Date: #{(new Date).toUTCString()}
License: MIT License
Url: http://github.com/lambdalisue/Jencil
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
  m = error.match /Error: (.*)/
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
      compile.single "#{src}/#{file}.coffee", "#{dst}/#{file}.js", options, (error) ->
        failures++ if error?
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
task 'watch:debug', 'watch for changes on coffeescript files and continuously compile the file', (options) ->
  watch.debug FILES, CS, JS, options
task 'watch:release', 'watch for changes on coffeescript files and continuously compile the file', (options) ->
  watch.release FILES, CS, "#{JS}/#{NAME}.js", options
task 'compile:debug', 'compile coffeescript files to javascript files', (options) ->
  compile.debug FILES, CS, JS, options
task 'compile:release', 'compile coffeescript files to a single javascript file', (options) ->
  compile.release FILES, CS, "#{JS}/#{NAME}.js", options
task 'pack:coffee', 'pack coffeescript files to a single coffeescript file', (options) ->
  files = ("#{CS}/#{file}.coffee" for file in FILES)
  dst = "#{CS}/#{NAME}.coffee"
  pack.coffeescript files, dst, options
task 'pack:requires', 'compile coffeescript files to a single javascript file', (options) ->
  files = REQUIRES.concat ["#{JS}/#{NAME}.js"]
  dst = "#{JS}/#{NAME}.full.js"
  pack.javascript files, dst, options
task 'build', 'invoke compile:release, pack:requires and minify the result javascript', (options) ->
  dst = "#{JS}/#{NAME}.js"
  compile.release FILES, CS, dst, options, (failures) ->
    if failures is 0
      pack.javascript REQUIRES.concat([dst]), dst, options, (failures) ->
        minify dst, "#{JS}/#{NAME}.min.js"
task 'demo', 'start demo server on 0.0.0.0:8000 via python SimpleHTTPServer', (options) ->
  reporter.head 'start demo server on 0.0.0.0:8000 ...'
  proc = spawn 'python', ['-m', 'SimpleHTTPServer'], {'cwd': DEMO}
  proc.stdout.on 'data', (data) ->
    process.stdout.write data
  proc.stderr.on 'data', (data) ->
    process.stdout.write data
  proc.on 'exit', (status) ->
    process.exit 1 if status isnt 0

task 'compose', 'compose all required resources to release', (options) ->
  reporter.info 'coming soon'
#### generate annotated source code with docco ###
#task 'docs', 'generate annotated source code with docco', ->
#  failed = 0
#  remaining = sources.length
#  reporter.log "Generating annotated source codes from CoffeeScript files...", logger.bold
#  reporter.log()
#  for file, index in sources then do (file, index) ->
#    src = "#{srcdir}/#{file}.coffee"
#    dst = "docs/#{file}.html"
#    exec "docco #{src}", (err, stdout, stderr) ->
#      if err?
#        logger.fail "#{src} => #{dst}", stderr
#        failed++
#      else
#        logger.success "#{src} => #{dst}"
#      process() if --remaining is 0
#  process = ->
#    logger.log()
#    if failed is 0
#      logger.info 'Annotated source codes has successfuly generated.'
#    else
#      logger.error "#{failed} document has failed to generate."
#    logger.log()
#
#### run the test suites via vows ###
#task 'test', 'run the test suites via vows', (options) ->
#  args = ("#{TESTDIR}/#{file}.coffee" for file in tests)
#  args.unshift '--spec'
#  proc = spawn 'vows', args
#  proc.stdout.on 'data', (buffer) ->
#    console.log buffer.toString().trim()
#  proc.stderr.on 'data', (buffer) ->
#    reporter.error buffer.toString().trim()
#  proc.on 'exit', (status) ->
#    process.exit(1) if status isnt 0
