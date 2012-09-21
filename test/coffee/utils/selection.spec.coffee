return if not window?

describe 'utils.selection.Selection(document, textarea) => object', ->
  it "should return Selection instance", ->
    instance = new Selection(document, sandbox.createElement('textarea'))
    instance.should.be.a.instanceof(Selection)

  textarea = instance = null

  before ->
    textarea = sandbox.createElement 'textarea'
    instance = new Selection(document, textarea)

  after ->
    sandbox.removeAllChildren()

  beforeEach ->
    textarea.value = """
      000001111122222333334444455555
      AAAAABBBBBCCCCCDDDDDEEEEEFFFFF
      aaaaabbbbbcccccdddddeeeeefffff
      """

  describe '#caret([start, end]) => instance | [start, end]', ->
    it 'should be an instance property', ->
      instance.should.have.property('caret').a('function')

    it 'should return a current caret position as [start, end]', ->
      caret = instance.caret()
      caret.should.length(2)
      caret[0].should.a('number')
      caret[1].should.a('number')

    it 'should set current caret position and return the instance', ->
      instance.caret(1, 2).should.be.equal(instance)
      instance.caret().should.be.eql([1, 2])

      # short
      instance.caret([3, 5]).should.be.equal(instance)
      instance.caret().should.be.eql([3, 5])

      # short
      instance.caret(2).should.be.equal(instance)
      instance.caret().should.be.eql([2, 2])

  describe '#caretOffset(offset) => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('caretOffset').a('function')

    it 'should set current caret position with offset value', ->
      instance.caret(1)
      instance.caretOffset(5).should.be.equal(instance)
      instance.caret().should.be.eql([6, 6])


  describe '#replace(str, start, end) => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('replace').a('function')

    it 'should replace a range (s, e)', ->
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

  describe '#text(str, keepSelection) => string | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('text').a('function')

    it 'should return a selected text', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---------|
      instance.caret(5, 15)
      selection = instance.text()
      selection.should.a('string')
      selection.should.equal('1111122222')

    it 'should replace a selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|
      #       *****
      instance.caret(5, 10)
      instance.text('*****')
      instance.caret().should.eql([10, 10])
      instance.caret(5, 10)
      instance.text().should.equal('*****')

      #     5    10    15    20    25    30
      # 00000 ***** 22222 33333 44444 55555
      #             |---|
      #             +++++ +++++
      instance.caret(10, 15)
      instance.text('++++++++++')
      instance.caret().should.eql([20, 20])
      instance.caret(5, 25)
      instance.text().should.equal('*****++++++++++33333')

    it 'should replace a selection and keep the selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|
      #       *****
      instance.caret(5, 10)
      instance.text('*****', true)
      instance.caret().should.eql([5, 10])

      #     5    10    15    20    25    30
      # 00000 ***** 22222 33333 44444 55555
      #             |---|
      #             +++++ +++++
      instance.caret(10, 15)
      instance.text('++++++++++', true)
      instance.caret().should.eql([10, 20])

  describe '#insertBefore(str, keepSelection) => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('insertBefore').a('function')

    it 'should insert a text before the selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #      ^|---|
      #    *****
      instance.caret(5, 10)
      instance.insertBefore '*****'
      instance.caret().should.eql([10, 10])
      instance.caret(0, 15)
      instance.text().should.equal('00000*****11111')

    it 'should insert a text before the selection and keep the selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #      ^|---|
      #    *****
      instance.caret(5, 10)
      instance.insertBefore '*****', true
      instance.caret().should.eql([5, 10])

  describe '#insertAfter(str, keepSelection) => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('insertAfter').a('function')

    it 'should insert a text after the selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|^
      #          *****
      instance.caret(5, 10)
      instance.insertAfter '*****'
      instance.caret().should.eql([15, 15])
      instance.caret(5, 20)
      instance.text().should.equal('11111*****22222')

    it 'should nsert a text after the selection and keep the selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #       |---|^
      #          *****
      instance.caret(5, 10)
      instance.insertAfter '*****', true
      instance.caret().should.eql([10, 15])

  describe '#enclose(lhs, rhs, keepSelection) => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('enclose').a('function')

    it 'should enclose the selection with lhs/rhs', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #      ^|---|^
      #    <<<<< >>>>>
      instance.caret(5, 10)
      instance.enclose '<<<<<', '>>>>>'
      instance.caret().should.eql([20, 20])
      instance.caret(0, 25)
      instance.text().should.equal('00000<<<<<11111>>>>>22222')

    it 'should enclose the selection with lhs/rhs and keep the selection', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      #      ^|---|^
      #    <<<<< >>>>>
      instance.caret(5, 10)
      instance.enclose '<<<<<', '>>>>>', true
      instance.caret().should.eql([5, 20])

  describe '#lineCaret(pos) => caret', ->
    it 'should be an instance property', ->
      instance.should.have.property('lineCaret').a('function')

    it 'should return caret of the line', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      # AAAAA BBBBB CCCCC DDDDD EEEEE FFFFF
      instance.lineCaret(50).should.be.eql([31, 61])

    it 'should return caret of the current line', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      # AAAAA BBBBB CCCCC DDDDD EEEEE FFFFF
      instance.caret(50)
      instance.lineCaret().should.be.eql([31, 61])

  describe '#line(value, keepSelection) => string | instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('line').a('function')

    it 'should return text of the current line', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      # AAAAA BBBBB CCCCC DDDDD EEEEE FFFFF
      instance.caret(50)
      instance.line().should.be.equal('AAAAABBBBBCCCCCDDDDDEEEEEFFFFF')

    it 'should set current line and return the instance', ->
      #     5    10    15    20    25    30
      # 00000 11111 22222 33333 44444 55555
      # AAAAA BBBBB CCCCC DDDDD EEEEE FFFFF
      instance.caret(50)
      instance.line('**********').should.be.equal(instance)

      textarea.value.should.be.equal("""
        000001111122222333334444455555
        **********
        aaaaabbbbbcccccdddddeeeeefffff
        """)

  describe '#selectWholeLine(pos) => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('selectWholeLine').a('function')

    it 'should select whole line of the pos', ->
      instance.selectWholeLine(50).should.be.equal(instance)
      instance.caret().should.be.eql([31, 61])

  describe '#selectWholeCurrentLine() => instance', ->
    it 'should be an instance property', ->
      instance.should.have.property('selectWholeCurrentLine').a('function')

    it 'should select whole line of the pos', ->
      instance.caret(50)
      instance.selectWholeCurrentLine().should.be.equal(instance)
      instance.caret().should.be.eql([31, 61])
