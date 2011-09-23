fs = require 'fs'
path = require 'path'
{print} = require 'sys'
{spawn, exec} = require 'child_process'

header = """
/**
* management tool for coffee-script project of node
* http://github.com/lambdalisue/coffee-node-skeleton
*
* Copyright 2011, Alisue
* Released under the MIT License
*/
"""

build = (watch, callback) ->
  if typeof watch is 'function'
      callback = watch
      watch = false
  options = ['-c', '-o', 'lib', 'src']
  options.unshift '-w' if watch

  coffee = spawn 'coffee', options
  coffee.stdout.on 'data', (data) -> print data.toString()
  coffee.stderr.on 'data', (data) -> print data.toString()
  coffee.on 'exit', (status) -> callback?() if status is 0

task 'docs', 'Generate annotated source code with Docco', ->
    fs.readdir 'src', (err, contents) ->
        options = ("src/#{file}" for file in contents when /\.coffee$/.test file)

        docco = spawn 'docco', options
        docco.stdout.on 'data', (data) -> print data.toString()
        docco.stderr.on 'data', (data) -> print data.toString()
        docco.on 'exit', (status) -> callback?() if status is 0

task 'build', 'Compile CoffeeScript source files', ->
    build()

task 'watch', 'Recompile CoffeeScript source files when modified', ->
    build true

task 'test', 'Run the test suite', ->
    build ->
        options = ['tests']

        nodeunit = spawn 'nodeunit', options
        nodeunit.stdout.on 'data', (data) -> print data.toString()
        nodeunit.stderr.on 'data', (data) -> print data.toString()
        nodeunit.on 'exit', (status) -> callback?() if status is 0
