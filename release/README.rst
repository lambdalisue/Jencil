******************************
 Jencil
******************************

**Under developing**

Jencil is a JavaScript plugin which allows you to turn any textarea into
a markup editor. It is inspired by `markItUp! <http://markitup.jaysalvat.com/home/>`_

While markItUp! is not meant to be "Full-Features-Out-of-theBox"-editor.
Jencil also is lightweight and customizable. The difference between markItUp!
is that Jencil is a little bit more powerful than markItUp! while Jencil has

-   Resizable
-   Fullscreen mode
-   Tab indentation
-   Autoindent
-   Preview (Quick view) panel
-   Help panel
-   User can change document type (not yet)
-   Plugabble editor/viewer/helper/profile
-   Internationalization with i18next

Usage
==========

1.  Include jQuery and Jencil javascript files::

        <script src="js/jquery-1.8.0.min.js"></script>
        <script src="js/Jencil.0.1.2.min.js"></script>

    .. Note::
        If you want to enable Resizable feature, include jQuery-UI.

        If you want to enable i18n feature, include i18next.

2.  Include the CSS files::

        <link rel="stylesheet" href="css/Jencil.0.1.2.min.css">

3.  Then plug Jencil on a specific textarea::

        <script>
            $(function() {
                $("textarea#demo").jencil();
            });
        </script>

    .. Note::
        If you want to enable i18n feature, do like this::

            <script>
                $(function() {
                    i18n.init(function(t){
                        $("textarea#demo").jencil();
                    });
                });
            </script>

4.  Check https://github.com/lambdalisue/Jencil/blob/master/src/coffee/core.coffee to find options available in Jencil

:Author: Alisue (lambdalisue@hashnote.net)
:Version: 0.1.3
:License: MIT License
:Required: jQuery, jQuery-UI (Resizable option), i18next (i18n option)
:Url: http://github.com/lambdalisue/Jencil
:Supported: Firefox, Chrome, IE9
:Not confirmed yet: Safari, Opera, IE6-8
