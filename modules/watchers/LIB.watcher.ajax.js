/**
 * @EXAMPLE:
	 <a class="js-ajax" href="http://ws.audioscrobbler.com" action="http://ws.audioscrobbler.com" data-ajax='{
		"ajaxOptions": {
			"type": "post",
			"data": "serializedFormData",
			"dataType": "json"
		},
		"events": {
			"click": {
				"console.log": ["click before ajax send."]
			}
		},
		"response": {
			"done": {
				"console.log": ["AJAX FROM data-ajax"],
				"SmiTemplates/LIB/modules/watchers/LIB_watcher_accordion.init": [{
					"watcher": "accordion",
					"$scope":  ".test42",
					"dataOptions": { "type": "_joinAccordion" }
				}],
				"SmiTemplates/LIB/utils/LIB_util_render.renderHTML": [[
					{
						"el": ".incentive-main-header",
						"data": "data.recenttracks.track[0].album[\"#text\"]"
					},
					{
						"el": ".header-top",
						"data": "data.recenttracks[\"@attr\"].user"
					}
				]]
			},
			"fail": {
				"console.log": ["error"]
			}
		}
	 }'>Ajax container</a>
 */

define([
	"SmiTemplates/LIB/LIB",
	"SmiTemplates/LIB/utils/LIB.util.moduleParser"
], function(LIB, LIB_moduleParser) {

	return function() {

		this.defaults = {
		};

		this.apply = function() {
			this.renderEvents();
		};


		this.renderEvents = function() {
			var that = this;

			if(!!this.defaults.dataOptions.events) {

				$.each( this.defaults.dataOptions.events, function(event, methodsToCall ) {
					that.$el.on(event, function(e) {

						// Need to update [this.defaults.dataOptions] after each click. Need to fix it..
						that.defaults.dataOptions = JSON.parse(that.$el.attr('data-ajax'));

						e.preventDefault();
						(new LIB_moduleParser).start(methodsToCall, that.$el, function() {
							if( methodsToCall.hasOwnProperty("no-ajax") ) {
								return false;
							} else {
								// Ajax request
								that.initAjax();
							}
						});
					});
				});
			} else {
				that.initAjax();
			}
		};


		this.initAjax = function() {
			var that = this;
			var data = that.defaults.dataOptions.ajaxOptions.data;

			// If we send ajax on form submission we can add serialized form parameters to data object
			// Just set { data: 'serializedFormData' }
			if(typeof data == 'string' && data.match('serializedFormData')) {
				that.defaults.dataOptions.ajaxOptions.data = that.$el.serialize();
			}

			// Need to check [href] attr of current link.
			if(!!that.$el.attr('href')) {
				that.defaults.dataOptions.ajaxOptions.url = that.$el.attr('href');
			}
			if(!!that.$el.attr('action')) {
				that.defaults.dataOptions.ajaxOptions.url = that.$el.attr('action');

			}

			// Send ajax request here, get request object
			var request = $.ajax(that.defaults.dataOptions.ajaxOptions);

			if(!!that.defaults.dataOptions.response) {
				$.each(that.defaults.dataOptions.response, function(ajaxCallback, methodsToCall) {
					request[ajaxCallback](function(data) {
						(new LIB_moduleParser).start(methodsToCall, that.$el, data);
					});
				});
			}
			request.fail(function(data) {
				LIB.loader.hide();
				// Trigger custom data watchers events here
				$(document).trigger('data:fail', {
					$context: that.$el,
					data:     data
				});
			});
		}
	}
});