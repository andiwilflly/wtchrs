/**
 * Basic LIB watcher module
 */

define([
	"SmiTemplates/LIB/modules/LIB.main"
], function(LIB_main) {

	return function() {

		this.defaults = {
		};

		this.events = {
		};

		this.init = function(params) {
			LIB_main.onReady(this, params);
			var that = this;
			//console.log('init', this.defaults.watcher);

			if(!!params.dataOptions) {
				this.getOptions(params.dataOptions);
			} else {
				this.getOptions(this.$el.attr('data-' + this.defaults.watcher));
			}

			// Extend [this.defaults.settings] with [this.defaults.dataOptions]
			this.extendDataOptions();

			// Need to check matchMedia before we can [apply] or [drop] this watcher.
			this.beforeApply();
		};


		this.getOptions = function(dataOpt) {
			try {
				this.defaults.dataOptions = JSON.parse(dataOpt);
			} catch (e) {
				this.defaults.dataOptions = dataOpt || {};
			}
		};


		this.apply = function() {
			// Nothing to de here..
		};

		this.drop = function() {
			// Nothing to de here..
		};


		this.extendDataOptions = function() {
			if (typeof this.defaults.dataOptions === 'object' && !!this.defaults.settings) {
				$.extend(this.defaults.settings, this.defaults.dataOptions);
			} else {
				if (typeof this.defaults.dataOptions === 'object') {
					this.defaults.settings = this.defaults.dataOptions;
				} else {
					this.defaults.settings = {};
					throw '[this.defaults.dataOptions] is incorrect or empty. Check your data-watchers JSON syntax.';
				}
			}
		};


		this.beforeApply = function() {
			var that = this;
			// Find matchMedia settings
			$.each(this.defaults.settings, function(k, v) {
				if (typeof v.module !== 'undefined' && typeof v.arguments !== 'undefined') {
					k = v.module;
					v = v.arguments;
				}
				if(!!k.match('matchMedia')) {
					that.defaults.matchMediaSettings = true;
					that.checkMediaBeforeApply(k, v);
				}
			});
			// If there is no matchMedia settings just run apply method
			if(!that.defaults.matchMediaSettings) this.apply();
		};


		this.checkMediaBeforeApply = function(mediaTrigger, arrayOfMedia) {
			var that = this;
			// Validate match media trigger
			if(!!document[mediaTrigger]) {
				_refreshApply();
				$(document).on(mediaTrigger, function(e) {
					_refreshApply();
				});
			}
			function _refreshApply() {
				(arrayOfMedia.indexOf(document[mediaTrigger]) > -1) ? that.apply() : that.drop() ;
			}
		};
	};
});