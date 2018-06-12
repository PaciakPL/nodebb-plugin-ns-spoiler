(function (Filters) {
    'use strict';

    var controller = require('./controller');

    Filters.composerFormatting = function (payload, callback) {
        payload.options.push({
            name     : 'ns-spoiler',
            className: 'fa fa-eye'
        });
        callback(null, payload);
    };

    Filters.composerHelp = function (helpText, callback) {
        helpText += '<h2>Spoiler</h2>';
        helpText += 'By ukryć treść, możesz użyć spoilera:';
        helpText += '\n<pre>\n:::\n\ntreść spoilera będzie ukryta pod interaktywnym przyciskiem\n\n:::</pre>';
        callback(null, helpText);
    };

    Filters.parsePost = function (payload, callback) {
        controller.parsePost(payload, callback);
    };

})(module.exports);
