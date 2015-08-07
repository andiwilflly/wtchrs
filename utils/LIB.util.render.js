/**
 * Render html, JSON as html
 */

define([], function() {

	return {

		defaults: {},

		renderHTML: function(dataObj) {
			dataObj.method = (!!dataObj.method) ? dataObj.method : 'html' ; // Can be used: html, prepend, append, text, after, before

			if (!!dataObj) {
				$(dataObj).each(function(k, v) {
					$(v.el)[dataObj.method](v.data);
				});
			}
		},

		renderList: function(dataObj) {
			// Return html list <li>

			if (!!dataObj) {
				$(dataObj).each(function(k, v) {

					var list = "<ul>";

					$(v.data).each(function(k, v) {
						list += "<li>" + v + "</li>";
					});

					list += "</ul>";

					$(v.el).html(list);
				});
			}
		},

		test: {
			some: {
				renderHTML: function(dataObj) {
					dataObj.method = (!!dataObj.method) ? dataObj.method : 'html' ; // Can be used: html, prepend, append, text, after, before

					if (!!dataObj) {
						$(dataObj).each(function(k, v) {
							$(v.el)[dataObj.method](v.data);
						});
					}
				}
			}
		}
	};
});