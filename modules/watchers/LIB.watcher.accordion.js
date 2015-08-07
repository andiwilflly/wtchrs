/**
 * @SOURCE:
 * http://api.jqueryui.com/accordion
 *
 *
 * @EXAMPLE:
 * {
 * <div class="someClass" data-accordion='{
 *     "type": "_joinAccordion"
 *     "matchMedia": ["smartPhone", "tablet"]
 * }'>
 * }
 *
 * @type: (optional) name of function that init jQuery UI accordion plugin
 * @matchMedia: (optional) sets machMedia breakpoints where accordion will be apply
 */
define([
	"SmiTemplates/LIB/LIB"
], function(LIB) {

	return function() {

		this.apply = function() {
			this.joinAccordion();
			// FOUC data-watcher.scss
			this.$el.css('opacity', 1);
		};


		this.drop = function() {
			try {
				this.$el.accordion("destroy");
			} catch (e) {
				// Accordion was not applied to this $el
			}
			// FOUC data-watcher.scss
			this.$el.css('opacity', 1);
		};


		this.joinAccordion = function() {
			// Need to add [_joinAccordionWrapped] method
			if( typeof LIB[this.defaults.settings.type] === "function" ) {
				LIB[this.defaults.settings.type](this.$el);
			} else {
				LIB._joinAccordion(this.$el);
			}
		}
	};
});
