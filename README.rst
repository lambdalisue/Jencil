******************************
 Textarea.coffee
******************************

Cross browser textarea munipulator script written in CoffeeScript

This script is inspired by `Control.TextArea <http://livepipe.net/control/textarea>`_ and 
`markItUp! <http://markitup.jaysalvat.com/home/>`_

:Author: Alisue (lambdalisue@hashnote.net)
:License: MIT License
:Url: http://github.com/lambdalisue/Textarea.coffee

How to use
====================
First you have to include ``textarea.js`` on your HTML. HTML looks like below::
    
    <html>
        <head>
            <meta charset="utf-8">
            <script type="text/javascript" src="https://raw.github.com/lambdalisue/textarea.coffee/master/lib/textarea.js"></script>
            <!-- optional -->
            <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
            <!-- /optional -->
        </head>
        <body>
            <textarea id="textarea">
            When I find myself in times of trouble
            Mother Mary comes to me
            Speaking words of wisdom, let it be.
            And in my hour of darkness
            She is standing right in front of me
            Speaking words of wisdom, let it be.
            Let it be, let it be.
            Let it be, let it be.
            Whisper words of wisdom, let it be.
            </textarea>
        </body>
    </html>
                                                  
CoffeeScript with jQuery + Firebug::              
    
    <script type="text/javascript" src="http://jashkenas.github.com/coffee-script/extras/coffee-script.js"></script>
    <script type="text/coffeescript">
        $(->
            textarea = new Textarea $('#textarea')        
            console.log textarea.getValue()               
            console.log textarea.getSelection()           
            textarea.setSelection 2, 4                    
            console.log textarea.getSelected()            
            textarea.replaceSelected 'foobar'             
            textarea.replaceSelected 'hogehoge', true     
            textarea.insertBeforeSelected 'foobarLeft'    
            textarea.insertBeforeSelected 'foobarLeft',   true
            textarea.insertAfterSelected 'foobarRight'    
            textarea.insertAfterSelected 'foobarRight', true
            textarea.wrapSelected 'left', 'right'
            textarea.wrapSelected 'left', 'right', true
        )
    </script>

JavaScript with Firebug::

    <script type="text/javascript">
        $(function(){
            var textarea = document.getElementById('textarea');
            textarea = new Textarea(textarea);
            console.log(textarea.getValue());
            console.log(textarea.getSelection());
            textarea.getSelection(2, 4);
            console.log(textarea.getSelected());
            textarea.replaceSelected('foobar');
            textarea.replaceSelected('hogehoge', true);
            textarea.insertBeforeSelected('foobarLeft');
            textarea.insertBeforeSelected('foobarLeft', true);
            textarea.insertAfterSelected('foobarRight');
            textarea.insertAfterSelected('foobarRight', true);
            textarea.wrapSelected('left', 'right');
            textarea.wrapSelected('left', 'right', true);
        });
    </script>

References
====================

-   http://archiva.jp/web/javascript/getRange_in_textarea.html
-   http://livepipe.net/control/textarea
-   http://markitup.jaysalvat.com/home/
