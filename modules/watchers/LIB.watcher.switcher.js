/**
 * @EXAMPLE:
 * {
 * data-switcher='{
 *	  "currentMediaType": "matchMedia_profile",
 *	  "tablet":           "#tests, insertBefore",
 *	  "smartPhone":       "#side-menu-trigger, appendTo"
 * }'
 *
 * @currentMediaType - windowMatchMediaTriggers settings from [main-js-config.js]
 * [@desktop, @tablet, @smartPhone] - list or matchMedia queries
 */

define([
	"SmiTemplates/LIB/LIB"
], function(LIB) {

	return function() {

		this.defaults = {
			switcherId: LIB.uniqueId(),
			resolutions: {},
			settings: {
				currentMediaType: 'matchMedia', // See [main-js-config.js] file
				breakpoints: ['desktop', 'tablet', 'smartPhone']
			}
		};


		this.apply = function() {
			var that = this;

			that.prepareSwitcher();

			that.checkMedia();
			LIB.onWindowResize(function() {
				that.checkMedia();
			}, 100);

			// FOUC data-watcher.scss
			that.$el.css('opacity', 1);
		};


		this.prepareSwitcher = function() {
			var that = this;
			// Wrap switcher block into switcher wrapper and make variable
			that.defaults.wrapper = that.$el.wrap('<div id="data-switcher-wrapper-' + that.defaults.switcherId + '">').parent();
			$.each(that.defaults.settings.breakpoints, function(k, resolution) {
				that.defaults.resolutions[resolution] = !!that.defaults.dataOptions[resolution] ? that.defaults.dataOptions[resolution].split(', ') : false
			});
		};


		this.checkMedia = function() {
			this.defaults.resolutions[document[this.defaults.settings.currentMediaType]] ? this.fireSwitcher() : this.backSwitcher();
		};

		this.fireSwitcher = function() {
			var resolution = document[this.defaults.settings.currentMediaType];
			this.$el['' + this.defaults.resolutions[resolution][1] + '']($(this.defaults.resolutions[resolution][0]));
		};

		this.backSwitcher = function() {
			this.defaults.wrapper.append(this.$el);
		}
	}
});