/**
 * @SOURCE:
 * https://github.com/marcj/jquery-selectBox
 * http://www.bulgaria-web-developers.com/projects/javascript/selectbox
 *
 * @EXAMPLE:
 * <select name="" id="tests" data-select='{
 *	  "speed":  1000,
 *	  "effect": "fade",
 *	  "onOpen": "some.method.to.open.onOpen.event"
 *	}'>
 *    <option value="12">12</option>
 *    <option value="42">42</option>
 * </select>
 *
 */

define([
	"SmiTemplates/LIB/modules/LIB.applyPlugins",
	"SmiTemplates/LIB/utils/LIB.util.moduleParser"
], function(LIB_applyPlugins, LIB_moduleParser) {

	return function() {

		this.defaults = {
			settings: {
				onChange: jQuerySelectBox_onChange_helper, // Fix problem with FF browser [selected] options
				onOpen: jQuerySelectBox_onOpen_helper // Hide selected option from select box
			}
		};

		this.apply = function() {
			var that = this;
			(new LIB_moduleParser).start(that.defaults.settings, this.$el, function() {
				LIB_applyPlugins.selectbox(that.$el, that.defaults.settings);

				// FOUC data-watcher.scss
				that.$el.css('opacity', 1);
			});
		}
	}
});