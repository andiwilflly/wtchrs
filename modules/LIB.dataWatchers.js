/**
 * LIB data watcher setup (join in smi_templates [main.js] file)
 */
define([
	"SmiTemplates/LIB/LIB"
], function(LIB) {

	return function () {

		var that = this;

	
		that.defaults = {
			$scope: $('body'),
			watchers: [
				'accordion',
				'ajax',
				'event',
				'prettycheck',
				'scrollpane',
				'select',
				'switcher',
				'tooltip',
                'slickslider',
				'execute',
				'validator'
			]
		};

		that.events = {
		};

		that.init = function(params) {
			LIB.onReady(that, params);

			that.startWatchers();

			$(document).on('data:new', function(e, dataEvent) {
				require([
					'SmiTemplates/LIB/modules/watchers/LIB.watcher.' + dataEvent.dataName
				], function(Watcher) {
					that.initWatcher(Watcher, dataEvent.dataName, dataEvent.$el);
				});
			});
		};


		that.startWatchers = function() {
			$.each(that.defaults.watchers, function(k, name) {
				// Check current data-attr in DOM
				if(that.$el.find("[data-" + name + "]").length) {
					require([
						'SmiTemplates/LIB/modules/watchers/LIB.watcher.' + name
					], function(Watcher) {
						$.each(that.$el.find("[data-" + name + "]"), function() {
							that.initWatcher(Watcher, name, $(this));
						});
					});
				}
			});
		};


		that.initWatcher = function(Watcher, watcherName, $scope) {
			require([
				"SmiTemplates/LIB/modules/watchers/LIB.watcher.base"
			], function(BaseWatcher) {
				// Extend Watcher with BaseWatcher
				$.extend((new BaseWatcher), (new Watcher)).init({
					watcher: watcherName,
					$scope:  $scope
				});
			});
		}
	}
});