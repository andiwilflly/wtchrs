/**
 * Custom actions that can be used from [LIB data watchers] or [LIB]
 * and need to be loaded by requireJs
 *
 */
define([
    "SmiTemplates/LIB/LIB"
], function(LIB) {

    return  {

        // @SOURCE
        // http://flaviusmatis.github.io/flexibleArea.js
        textAreaDynamicHeight: function(el) {
            require([
                "SmiTemplates/Vendor/jquery.flexibleArea"
            ], function() {
                $(el).flexible();
            });
        },


        // @SOURCE:
        // https://github.com/blueimp/jQuery-File-Upload
        // https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin
        applyfileUpload: function(callback) {
            require([
                "SmiTemplates/Vendor/jquery.iframe-transport",
                "SmiTemplates/Vendor/jquery.fileupload"
            ], function() {
                if (typeof callback == 'function') {
                    callback();
                }
            });
        }
    };
});
