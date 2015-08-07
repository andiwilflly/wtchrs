/**
 * Some methods can be executed right after document ready
 *
 * @EXAMPLE:
 * {
 * <div class="someClass" data-execute='{
 *     "SmiTemplates/LIB/LIB.loader.show": ["#ambassador-polling-form", {"backgroundColor": "white"}],
 *     "SmiTemplates/LIB/LIB.loader.hide": []
 * }'>
 */

define([
    "SmiTemplates/LIB/utils/LIB.util.moduleParser"
], function(LIB_moduleParser) {

    return function() {

        this.apply = function() {
            (new LIB_moduleParser).start(this.defaults.settings, this.$el, false);
        };
    };
});
