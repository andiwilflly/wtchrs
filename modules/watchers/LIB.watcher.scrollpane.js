/**
 * @SOURCE:
 * http://jscrollpane.kelvinluck.com
 *
 * @EXAMPLE:
 * <div class="scroll-test" data-scrollpane>
 *	  some <br />longbr <br /> test
 * </div>
 *
 * @SETTINGS:
 * Any settings from jScrollPane API
 */

define([
	"SmiTemplates/LIB/utils/LIB.util.moduleParser"
], function(LIB_moduleParser) {

	return function() {

		this.defaults = {
			settings: window.jScrollPane_settings // Default settings from [main-js-config.js]
		};

		this.apply = function() {
			var that = this;

			// This is just [callback for plugin], need to eval() all [default settings]
			$.each(that.defaults.settings, function(k, v) {
				try {
					that.defaults.settings[k] = eval(v);
				} catch(e) {
					that.defaults.settings[k] = v;
				}
			});

			that.$el.jScrollPane(that.defaults.settings);

			// FOUC data-watcher.scss
			that.$el.css('opacity', 1);
		};


		// TODO: Need to add matchMedia drop jscrollPane
		this.drop = function() {
			//console.log('drop');
		};
	}
});