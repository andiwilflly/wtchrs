define([

], function() {

	return {

		/**
		 *  Setup module instance
		 *  @param {object} that - module instance
		 *  @param {object} params - params of module instance
		 */
		onReady: function(that, params) {
			$.extend(that.defaults, params);  // Customize defaults
			that.$el = that.defaults.$scope;  // Set scope of this component
			this._eventsParser(that);         // Add events
		},


		/**
		 *  Add custom events listeners for current $scope of module
		 *  @param {object} that - module instance
		 */
		_eventsParser: function(that) {
			if(!!that.events) {
				try {
					$.each(that.events, function(k, callback) {
						if( k.split(/ (.+)?/)[1] == "window" ) {
							$(window).on(k.split(/ (.+)?/)[0], eval(callback));
						} else {
							that.$el.on(k.split(/ (.+)?/)[0], k.split(/ (.+)?/)[1], eval(callback));
						}
					});
				} catch(err) {
					throw "[LIB._eventsParser]: Invalid event type";
				}
			}
		},


		/**
		 *  Function, scheduling it to run after the current call stack has cleared
		 *  Underscore defer method
		 *  @param {function} fn - callback function to run
		 *  @returns {object} LIB
		 */
		defer: function(fn) {
			setTimeout(function() {
				fn();
			}, 0);
			return this;
		},


		/**
		 * Simple function that returns unique id
		 * @returns {string}
		 */
		uniqueId: function() {
			var result = '';
			for (var i = 8; i > 0; --i) result += '0123456789abcdefgABCDEFG'[Math.round(Math.random() * ('0123456789abcdefgABCDEFG'.length - 1))];
			return result;
		},


		/**
		 * Clone object
		 * @param {object} obj
		 */
		cloneObject: function (obj) {
			if (obj === null || typeof obj !== 'object') { throw "[lib.cloneObject]: Invalid argument: " + obj + " must be object"; }
			var lib = this;
			var temp = obj.constructor(); // give temp the original obj's constructor
			for (var key in obj) { temp[key] = lib.cloneObject(obj[key]); }
			return temp;
		},


		/**
		 * @param {object} obj - object that will be converted to string
		 * @param {int} ndeep - max
		 * @returns {string}
		 */
		objToString: function(obj, ndeep) {
			var that = this;
			if(obj == null){ return String(obj); }
			switch(typeof obj){
				case "string": return '"'+obj+'"';
				case "function": return obj.name || obj.toString();
				case "object":
					var indent = Array(ndeep||1).join('\t'), isArray = Array.isArray(obj);
					return '{['[+isArray] + Object.keys(obj).map(function(key){
							return '\n\t' + indent + key + ': ' + that.objToString(obj[key], (ndeep||1)+1);
						}).join(',') + '\n' + indent + '}]'[+isArray];
				default: return obj.toString();
			}
		},


		/**
		 * Create custom object from given array of parameters
		 *
		 * @param {array} array - array of arrays [objKey, objValue]
		 * @returns {object} object form given parameters
		 */
		makeObject: function(array) {
			var obj = {};
			if(array[0] instanceof Array) {
				$.each(array, function(k, v) {
					obj[v[0]] = v[1];
				});
			} else
			if(typeof array[0] == 'string') {
				obj[array[0]] = array[1];
			} else {
				throw "[LIB.makeObject]: Invalid arguments. Must be array or array of arrays";
			}
			return obj
		},


		/**
		 * Make possible to add [delay] to window [resize] event
		 * @param {function} callback
		 * @param {number} delay - milliseconds delay
		 * @returns {*}
		 */
		onWindowResize: function(callback, delay) {
			delay = delay || 0;
			var timeoutId = 0;
			return jQuery(window).on("resize", function() {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(callback, delay);
			});
		},


		/**
		 * Make possible to add [delay] to [onScroll] event
		 * @param {object} $el - element to onScroll event
		 * @param {function} callback
		 * @param delay
		 * @returns {*}
		 */
		onScroll: function($el, callback, delay) {
			delay = delay || 0;
			var timeoutId = 0;
			return $el.scroll("scroll", function() {
				clearTimeout(timeoutId);
				timeoutId = setTimeout(callback, delay);
			});
		},


		/**
		 * Simple JavaScript Inheritance of classes
		 * EXAMPLE: lib._extend(Parent, function() { ... });
		 *
		 * @param {function} parent - function constructor
		 * @param {function} child - function constructor
		 * @returns {*}
		 */
		_extend: function(parent, child) {
			child.prototype = new parent();
			child.prototype.constructor = child;
			child.prototype.superClass = parent.prototype;
			return child;
		},


		/**
		 * Simple JavaScript declension of words
		 * EXAMPLE: declensionOfWords(5, ['секунда', 'секунды', 'секунд'])
		 *
		 * @param {number} number - any number
		 * @param {array} titles - array with three strings
		 * @returns {*}
		 */
		declensionOfWords: function(number, titles) {
			cases = [2, 0, 1, 1, 1, 2];
			return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
		},


		/**
		 * Add css link tag to html head
		 *
		 * @param {string} url - path to css file
		 * @returns {object} object with params that was in query string
		 */
		requireCss: function(url) {
			var tag_css = document.createElement('link');
			tag_css.type = 'text/css';
			tag_css.rel = 'stylesheet';
			tag_css.href = url + '?css=' + this.uniqueId();
			document.getElementsByTagName('head')[0].appendChild(tag_css);
		},


		/**
		 * Is an object a email address
		 *
		 * @param {*} obj - string or object to test email
		 * @returns {boolean}
		 */
		isEmail: function(obj) {
			if (typeof (obj) == 'string') {
				return !!obj.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/ig);
			} else {
				return false;
			}
		},


		/**
		 * Transform query string to object
		 *
		 * @param {string} qs query string (like after form.serialize())
		 * @returns {object} object with params that was in query string
		 */
		queryToJson: function(qs) {
			qs = qs.split("+").join(" ");
			var prevTokenName, prevTokenVal;
			var params = {}, tokens,
				re = /[?&]?([^=]+)=([^&]*)/g;
			while (tokens = re.exec(qs)) {
				if (prevTokenName == decodeURIComponent(tokens[1])) {
					if (params[prevTokenName] instanceof Array) {
						params[prevTokenName].push(decodeURIComponent(tokens[2]));
					} else {
						params[prevTokenName] = [];
						params[prevTokenName].push(prevTokenVal);
						params[prevTokenName].push(decodeURIComponent(tokens[2]));
					}
				} else {
					params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
				}
				prevTokenName = decodeURIComponent(tokens[1]);
				prevTokenVal = decodeURIComponent(tokens[2]);
			}
			return params;
		},


		/**
		 * PreLoader for async calls in js
		 *
		 * @param {object} styling - custom styles for loader
		 * @param {object} $target - target element in which insert loader
		 *
		 */
		loader: {
			show: function($target, styling) {
				$target = $($target);
				var stylingDefault = {
					height: "auto",
					width: "100%",
					top: 0,
					bottom: 0,
					right: 0,
					left: 0,
					position: "absolute",
					backgroundColor: "rgba(237, 237, 237, 0.2)",
					cursor: "progress",
					backgroundImage: "url(/typo3conf/ext/smi_templates/Resources/Public/Img/spinner.gif)",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "100px",
					zIndex: "10000"
					};
				styling = $.extend(stylingDefault, styling) || stylingDefault;

				$('#ajax-loader').remove();
				$target.css('position', 'relative').append($('<div/>', {id: 'ajax-loader'}));
				$("#ajax-loader").css(styling);
			},
			hide: function() {
				$('#ajax-loader').remove();
			}
		},

		/**
		 * Manager of enable disable fields
		 * Just add to form $el such attribute: data-disabled-by="#select-market,#start-date .."
		 *
		 * @param elements (optional) list of elements to enable disable
		 * @returns {boolean}
		 */
		enableDisableFields: function(elements) {
			elements = elements || $('[data-disabled-by]');
			var res = true;

			elements.each(function() {
				var disabledEl = $(this);

				if (_check(disabledEl.attr('data-disabled-by').split(','))) {
					disabledEl.removeClass('is-disabled');
				} else {
					disabledEl.addClass('is-disabled');
				}

				function _check(arr) {
					$.each(arr, function(k, v) {

						if ($(v).val() == 0 || $(v).val() == '') {
							res = false;
						} else
						if($(v).val() == -1 || $(v).val() == '-1') {
							var dataHiddenByEl = $(v).parent().find('[data-hidden-by]');
							res = dataHiddenByEl.length && dataHiddenByEl.val();
						}
					});
					return res
				}
			});
			return res
		}
	}
});