/**
 * Attach events to the DOM element
 *
 * @EXAMPLE 1 (with data ajax inside):
 '{
	"click": {
		"console.log": ["EVENT: click"],
		"SmiTemplates/LIB/modules/watchers/LIB_watcher_ajax.init": [{
			"dataOptions": {
				"ajaxOptions": {
					"type": "post",
					"url": "http://ws.audioscrobbler.com",
					"dataType": "json"
				},
				"response": {
					"done": {
						"console.log": ["AJAX FROM data-event > click"],
						"SmiTemplates/LIB/utils/LIB_util_render.renderHTML": [[
							{
								"el": ".track-list",
								"data": "data.recenttracks.track"
							}
						]],
						"SmiTemplates/LIB/modules/watchers/LIB_watcher_ajax.init": [{
							"dataOptions": {
								"ajaxOptions": {
									"type": "post",
									"url": "http://ws.audioscrobbler.com",
									"dataType": "json"
								},
								"response": {
									"done": {
										"console.log": ["AJAX FROM data-event > click > data-ajax > done "],
										"SmiTemplates/LIB/utils/LIB_util_render.renderHTML": [[
											{
												"el": ".track-list",
												"data": "data.recenttracks.track"
											}
										]]
									}
								}
							}
						}]
					}
				}
			}
		}]
	}
 }'
 * 
 * @EXAMPLE 2:
 * LIB.$('.selector').data('event', {
 *	   "click": {
 *		   "console.log": ["EVENT: click"],
 *	   },
 *	   "once_click": {
 *		   "console.log": ["EVENT: click"],
 *	   },
 *	   "once_mynamespace:click": {
 *		   "console.log": ["EVENT: click"],
 *	   },
 * });
 *
 *
 * @EXAMPLE 3 (call from f:form.textarea):
 *  additionalAttributes='{data-event:
 *		"{v:format.json.encode(
 *			value: {
 *				once_click: {
 *					0: {
 *						module:    \"SmiTemplates/LIB/modules/actions/LIB_actions_custom.textAreaDynamicHeight\",
 *						arguments: {0: \"#open-feedback-text\"}
 *					}
 *				},
 *				keyup: {
 *					0: {
 *						module:    \"SmiCampaigns/ambassador-tasks_module.updateOpenFeedbackCounter\",
 *						arguments: {0: \"#open-feedback-text\"}
 *					}
 *				}
 *			}
 *		)}"
 *	}'
 */

define([
	"SmiTemplates/LIB/utils/LIB.util.moduleParser"
], function(LIB_moduleParser) {

	return function() {

		this.defaults = {};

		this.apply = function() {

			var that = this;
			$.each(that.defaults.settings, function(event, methodsToCall) {
				// Event can be used Once if has [once_] prefix
				var bindType = (!!(event).match('once_')) ? 'one' : 'on';

				that.$el[bindType](event.split('_')[event.split('_').length - 1], function(e) {
					e.preventDefault();
					(new LIB_moduleParser).start(methodsToCall, that.$el, e);
				});
			});
		};
	};
});
