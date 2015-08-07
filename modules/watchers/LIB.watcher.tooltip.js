/**
 * @SOURCE:
 * http://api.jqueryui.com/tooltip
 *
 *
 * @EXAMPLE:
 * <div class="test-tooltip" title="test tooltip text" data-tooltip>test tooltip div</div>
 * <div class="test-tooltip1" title="test tooltip text1" data-tooltip='{
 *     "position": { "my": "left+15 center", "at": "right center" },
 *	   "show": { "effect": "blind", "duration": 800 }
 * }'>test tooltip div</div>
 *
 *
 * @SETTINGS
 * Any settings from jQuery UI tooltip API
 * (content, disabled, hide, items, position, show, tooltipClass, track)
 */

define([
], function() {

	return function() {

		this.defaults = {
		};

		this.apply = function() {
			this.$el.tooltip(this.defaults.settings);
		};
	}
});