/* globals define, app, ajaxify, bootbox, socket, templates, utils */

$(document).ready(function () {
    'use strict';

    var tag    = ':::',
        nl     = '\n\n',
        textPrompt = 'Usuń konto';

    $(window).on('action:composer.loaded', function (ev, data) {
        if ($.Redactor && $.Redactor.opts.plugins.indexOf('ns-spoiler') === -1) {
            $.Redactor.opts.plugins.push('ns-spoiler');
        }
    });

    $(window).on('action:composer.enhanced', function () {
        require([
            'composer/formatting', 'composer/controls'
        ], function (formatting, controls) {
            formatting.addButtonDispatch('ns-spoiler', composerControlDidClick);

            function composerControlDidClick(textArea, selectionStart, selectionEnd) {
                if (selectionStart === selectionEnd) {
                    var hlContentStart = selectionStart + getTag().length,
                        hlContentEnd   = hlContentStart + textPrompt.length;
                    controls.insertIntoTextarea(textArea, getNewSpoiler(textPrompt));
                    controls.updateTextareaSelection(textArea, hlContentStart, hlContentEnd);
                } else {
                    controls.wrapSelectionInTextareaWith(textArea, getTag(), getTag());
                }
            }

            function getNewSpoiler(message) {
                return getTag() + message + getTag();
            }

            function getTag() {
                return nl + tag + nl;
            }
        });
    });

    $(window).on('action:redactor.load', function () {
        $.Redactor.prototype['ns-spoiler'] = function () {
            return {
                init   : function () {
                    var button = this.button.add('ns-spoiler', 'Add Spoiler');
                    this.button.setIcon(button, '<i class="fa fa-eye-slash"></i>');
                    this.button.addCallback(button, this['ns-spoiler'].onClick);
                },
                onClick: function () {
                    this.insert.html('<p>' + tag + '<br /><br />' + textPrompt + '<br /><br />' + tag + '</p>');
                }
            };
        };
    });

});
