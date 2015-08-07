/**
 * Add custom callbacks for some jQuery methods
 *
 * EXAMPLE:
 * require([
 * "SmiTemplates/LIB/modules/LIB.$"
 * ], function(LIB) {
 *	  $(document).on('data:new', function(e) {
 *		console.log('new ', arguments);
 *	});
 *	$(document).on('data:remove', function(e) {
 *		console.log('remove ', arguments);
 *	});
 *
 *	LIB.$('body').data('test', {a: 42});
 *	LIB.$('body').removeData('test');
 * });
 *
 * Or just require 'SmiTemplates/LIB/LIB'
 */

define([
], function() {

	return {
		$: function (el) {

			/**
			 * EXAMPLE:
			 * LIB.$('body').data('data-test', 3456);
			 * or just
			 * LIB.$('body').data('data-test');
			 */
			this.data = function(dataName, dataVal) {
				if(!!dataVal) {
					$(el).data(dataName, dataVal)                   // Add $ data attr
						 .attr('data-' + dataName, LIB.objToString(dataVal)); // Add $ attr
					// Custom events, etc.
					$(document).trigger('data:new', {
						$el:      $(el),
						dataName: dataName,
						dataVal:  dataVal
					});
				} else {
					// Just return data
					return $(el).data(dataName);
				}
				return this;
			};


			/**
			 * Remove data attr from $el
			 */
			this.removeData = function(dataName) {
				$(el).removeData(dataName)
					 .removeAttr('data-' + dataName);
				// Custom events, etc.
				$(document).trigger('data:remove', {
					$el:      $(el),
					dataName: dataName
				});
				return this;
			};

			return this
		}
	};

});