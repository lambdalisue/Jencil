return if not window?


describe 'utils.textarea.Selection(document, textarea) => object', ->
  textarea = instance = null

  before ->
    textarea = sandbox.createElement 'textarea'
    instance = new Selection(document, textarea)

  beforeEach ->
    #     5    10    15    20    25    30
    # 00000 11111 22222 33333 44444 55555
    textarea.value = '000001111122222333334444455555'

  after ->
    sandbox.removeAllChildren()

  describe '#caret([start, end]) => instance | [start, end]', ->
    it 'should return a list which length is 2', ->
      selection = instance.caret()
      selection.should.length(2)
      selection[0].should.a('number')
      selection[1].should.a('number')

    it 'should be able to change selection', ->
      instance.caret(10, 10).should.equal(instance)
      selection = instance.caret()
      selection[0].should.eql(10)
      selection[1].should.eql(10)

  describe '#text() => string', ->
    it 'should return a string selected', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---------|
      instance.caret(5, 15)
      selection = instance.text()
      selection.should.a('string')
      selection.should.equal('1111122222')

  describe '#replace(str, start, end) => instance', ->
    it 'should be able to replace range (s, e)', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|
      #       *****
      instance.replace('*****', 5, 10)
      instance.caret(5, 10)
      instance.text().should.equal('*****')

      #     5    10    15    20    25    30
      # 00000 ***** 22222 33333 44444 55555
      #             |---|
      #             +++++ +++++
      instance.replace('++++++++++', 10, 15)
      instance.caret(5, 25)
      instance.text().should.equal('*****++++++++++33333')

  describe '#replaceSelection(str, [keepSelection=false]) => instance', ->
    it 'should be able to replace selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|
      #       *****
      instance.caret(5, 10)
      instance.replaceSelection('*****')
      instance.caret().should.eql([10, 10])
      instance.caret(5, 10)
      instance.text().should.equal('*****')

      #     5    10    15    20    25    30
      # 00000 ***** 22222 33333 44444 55555
      #             |---|
      #             +++++ +++++
      instance.caret(10, 15)
      instance.replaceSelection('++++++++++')
      instance.caret().should.eql([20, 20])
      instance.caret(5, 25)
      instance.text().should.equal('*****++++++++++33333')

    it 'should be able to keep selection after replacement with keepSelection=true', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|
      #       *****
      instance.caret(5, 10)
      instance.replaceSelection('*****', true)
      instance.caret().should.eql([5, 10])

      #     5    10    15    20    25    30
      # 00000 ***** 22222 33333 44444 55555
      #             |---|
      #             +++++ +++++
      instance.caret(10, 15)
      instance.replaceSelection('++++++++++', true)
      instance.caret().should.eql([10, 20])

  describe '#insertBeforeSelection(str, [keepSelection=false]) => instance', ->
    it 'should be able to insert before selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #      ^|---|
      #    *****
      instance.caret(5, 10)
      instance.insertBeforeSelection '*****'
      instance.caret().should.eql([10, 10])
      instance.caret(0, 15)
      instance.text().should.equal('00000*****11111')

    it 'should be able to keep selection after insertion with keepSelection=true', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #      ^|---|
      #    *****
      instance.caret(5, 10)
      instance.insertBeforeSelection '*****', true
      instance.caret().should.eql([5, 10])

  describe '#insertAfterSelection(str, [keepSelection=false]) => instance', ->
    it 'should be able to insert after selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|^
      #          *****
      instance.caret(5, 10)
      instance.insertAfterSelection '*****'
      instance.caret().should.eql([15, 15])
      instance.caret(5, 20)
      instance.text().should.equal('11111*****22222')

    it 'should be able to keep selection after insertion with keepSelection=true', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|^
      #          *****
      instance.caret(5, 10)
      instance.insertAfterSelection '*****', true
      instance.caret().should.eql([10, 15])

  describe '#wrapSelection(b, a, [keepSelection=false]) => instance', ->
    it 'should be able to wrap around selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #      ^|---|^
      #    <<<<< >>>>>
      instance.caret(5, 10)
      instance.wrapSelection '<<<<<', '>>>>>'
      instance.caret().should.eql([20, 20])
      instance.caret(0, 25)
      instance.text().should.equal('00000<<<<<11111>>>>>22222')

    it 'should be able to keep selection after wrappping', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #      ^|---|^
      #    <<<<< >>>>>
      instance.caret(5, 10)
      instance.wrapSelection '<<<<<', '>>>>>', true
      instance.caret().should.eql([5, 20])


describe 'utils.textarea.Textarea(document, textarea) => object', ->
  textarea = instance = null

  before ->
    textarea = sandbox.createElement 'textarea'
    instance = new Textarea(document, textarea)

  beforeEach ->
    #     5    10    15    20    25    30
    # 00000 11111 22222 33333 44444 55555
    textarea.value = '000001111122222333334444455555'

  after ->
    sandbox.removeAllChildren()

  describe ".selection : Selection", ->
    it 'should be an instance of Selection', ->
      instance.should.have.a.property('selection')
      instance.selection.should.an.instanceOf(Selection)

  describe '#val([value]) => instance | number', ->
    it 'should be able to get current value', ->
      instance.val().should.equal('000001111122222333334444455555')

    it 'should be able to set new value', ->
      instance.val('*****').should.equal(instance)
      instance.val().should.equal('*****')

