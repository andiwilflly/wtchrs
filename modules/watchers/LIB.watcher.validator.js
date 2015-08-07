/**
 * If you want to validate form or smth else - you can use this watcher.
 * It will add [data-validator-error] classes to selected $ elements after ['data:fail'] event trigger.
 * Also it can render error messages from [error_msg_boxes].
 *
 * @EXAMPLE:
 * <form data-ajax="..." data-validator>
 *     // [data-validator-field] class can be added to input or any other element inside validate form
 *     <input class="data-validator-field" type="text">
 *
 *     // In this case div will be highlighted with [data-validator-error] class, not input
 *     <div class="data-validator-field">
 *     	   <input type="radio">
 *     </div>
 * </form>
 *
 * @EXAMPLE (render custom event message):
 * // Message from [error_msg_boxes] will be rendered here if you passed '.js-error-msg' to form data before form submit
 * <div class="js-error-msg"> ... </div>
 *
 *
 * @SETTINGS
 * - Form errors array example:
 * [
 * 	  form_errors: {
 * 	     field_name: msg
 * 	     field_name: msg
 * 	     field_name: msg
 * 	  }
 * 	  error_msg_boxes: {
 *		  selectors: msg // selectors string sends from form serialized hidden input or from data parameter of ajax request
 * 	  }
 * ]
 *
 * - Trigger event for [data-validator] example:
 * $(document).trigger('data:fail', {
 *	   $context: that.$el,
 *	   data:   data
 *	});
 *
 */


// TODO: Finish this data watcher
define([
], function() {

	return function() {

		this.defaults = {
		};

		this.apply = function() {
			$(document).on('data:fail', function(e, params) {

				// Render error classes to form fields
				$.each(params.data.form_errors, function(name, msg) {
					$('[name= '+ name + ']')
						.closest('.data-validator-field', params.$context[0])    // Set context for closest $el (https://api.jquery.com/closest/#closest-selector-context)
						.apply('<div class="data-validator-error-msg">' + msg + '</div>');
				});

				// Render error msges to custom $elements
				$.each(params.data.error_msg_boxes, function(selectors, message) {
					$(selectors).addClass('data-validator-error-msg').html(message);
				});
			});
		};
	}
});