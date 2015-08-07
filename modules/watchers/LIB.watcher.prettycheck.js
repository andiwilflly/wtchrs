/**
 * @SOURCE:
 * http://arthurgouveia.com/prettyCheckable
 *
 *
 * @EXAMPLE 1 (for single input):
 * <input type="checkbox" data-pretty />
 *
 * @EXAMPLE 2 (for all inputs inside div):
 * <div class="pretty-container" data-pretty='{
 *     "matchMedia": ["smartPhone", "tablet"]
 * }'>
 *    <input type="radio" />
 *    <input type="checkbox" />
 * </div>
 *
 *
 * @matchMedia: (optional) sets machMedia breakpoints where accordion will be apply
 */

define([
	"SmiTemplates/LIB/modules/LIB.applyPlugins"
], function(LIB_applyPlugins) {

	return function() {

		this.apply = function() {
			LIB_applyPlugins._initPrettyCheckable(this);
			// FOUC data-watcher.scss
			this.$el.css('opacity', 1);
		};


		this.drop = function() {
			// TODO: Fix it. Doesn`t work for now
			this.$el.find('input[type="radio"], input[type="checkbox"]').prettyCheckable('destroy');
			// FOUC data-watcher.scss
			this.$el.css('opacity', 1);
		}
	};
});