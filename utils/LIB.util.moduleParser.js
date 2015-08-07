/**
 * Module parser uses for parse data-watchers settings
 *
 * @EXAMPLE:
 * {
 * <div class="scroll-test" data-scrollpane='{
 *     "onOpen": "window.jQuerySelectBox_onChange_helper"
 *     "LIB_applyPlugins.selectbox": ['#test', {}]
 * }'>
 * }
 *
 * @NOTE:
 * If your file name contains . characters you need to replace them with _ characters.
 *
 * @STEPS:
 * Parse "onOpen": "window.jQuerySelectBox_onChange_helper", eval "window.jQuerySelectBox_onChange_helper" string, and add this method to [this.defaults.settings] object
 * Parse "LIB_applyPlugins.selectbox": ['#test', {}], require "modules/LIB.applyPlugins.js" file and
 * execute [selectbox] method with arguemnts: ['#test', {}] and additional [$scope] argument
 *
 */

define([
	"SmiTemplates/LIB/LIB"
], function(LIB) {

	return function() {

		/**
		 * @EXAMPLE:
		 * (new LIB_moduleParser).start(this.defaults.settings, this.$el, function() { console.log('kek'); });
		 *
		 * @param objects - list of methods to call, or just a list of callbacks
		 * @param $scope - current $el
		 * @param data - (optional) - data from ajax request of event jQuery object
		 * @param callback (optional) - function to call after all
		 */
		this.start = function(objects, $scope, data, callback) {
			this.defaults = {
			};

			this.defaults.data = {};
			this.defaults.$scope = $scope;

			if ( !!arguments[2] && typeof arguments[2] === "function" ) {
				this.defaults.callback = data;
			} else {
				this.defaults.data = data;
				this.defaults.callback = callback;
			}

			this.defaults.objects    = objects;
			this.defaults.mStep      = 0;
			this.defaults.mStepLimit = Object.keys(objects).length;

			this.defaults.moduleVal = {};

			// Recursive call
			this._fireModule();
		};


		this._fireModule = function() {
			var that = this;

			try {
				that.defaults.moduleKey = that.defaults.objects[that.defaults.mStep].module;
				if(!!that.defaults.objects[that.defaults.mStep].arguments) {
					that.defaults.moduleVal = that.defaults.objects[that.defaults.mStep].arguments;
				} else {
					that.defaults.moduleVal = [];
				}
			} catch (e) {
				that.defaults.moduleKey = Object.keys(that.defaults.objects)[that.defaults.mStep];
				that.defaults.moduleVal = that.defaults.objects[Object.keys(that.defaults.objects)[that.defaults.mStep]];
			}
			that.defaults.mStep += 1; // Update [step] after each call of [_fireModule]

			// Need to check if it is a [default callback] for some plugin or this is a [custom call] for LIB module
			if(typeof that.defaults.moduleVal === 'object') {

				// Need to extend default [arguments] with [extendedOptions] object
				that.defaults.moduleVal.push({
					$scope: that.defaults.$scope,
					data:   (typeof that.defaults.data != 'function') ? that.defaults.data : false
				});

				// This is a custom call of some method
				that.runMethod(that.defaults.moduleKey, that.defaults.moduleVal);
			} else {
				// This is just [callback for plugin], need to eval() all [default settings]
				$.each(that.defaults.objects, function(k, v) {
					try {
						that.defaults.objects[k] = eval(v);
					} catch(e) {
						// This parameter is not a [callback for plugin]
						that.defaults.objects[k] = v;
					}
				});
			}
		};


		/**
		 * Method run method with custom arguments
		 *
		 * @param modulePath - path to method for requireJs
		 * @param arguments - array of arguments to call with
		 */
		this.runMethod = function(modulePath, arguments) {

			try {
				// WE DON`T need [requireJs]
				// TODO: eval() for arguments?
				try {
					eval(modulePath).apply(eval(modulePath.split('.')[0]), arguments);
				} catch (err) {
					eval(modulePath)(); // Call functions that does not support $.apply()
				}
				_nextStep(this);
			} catch(err) {
				// WE NEED [requireJs] or this is INCORRECT [modulePath]
				try {
					_requireModule(this, modulePath.split('.')[0]);
				}
				catch(err) {
					_nextStep(this);
					throw 'Ohoh..';
				}
			}
		}
	};


	// --------------------------------------------------------------------
	// Private methods
	// --------------------------------------------------------------------
	function _requireModule(that, pathToModule) {
		require([
			pathToModule.replace(/_/g, '.') // Convert module name from LIB_utl_render to LIB.util.render
		], function(moduleName) {

			var methodToCall = that.defaults.moduleKey.split(/[.](.+)?/)[1];

			// The case when current [module] is [LIB.util.render].
			if( pathToModule.match("LIB_util_render") ) {
				_extendAjaxData(that); // Need to [insert real data] from ajax request before we call current method (moduleName[methodToCall])
			}

			// The case when current [module] is [LIB.watcher].
			if(pathToModule.match("LIB_watcher_")) {
				require([
					"SmiTemplates/LIB/modules/watchers/LIB.watcher.base"
				], function(BaseWatcher) {
					// Try to setup watcher
					$.extend((new BaseWatcher), (new moduleName)).init({
						watcher:     that.defaults.moduleVal[0].watcher,
						$scope:      (!!that.defaults.moduleVal[0].$scope) ? $(that.defaults.moduleVal[0].$scope) : that.defaults.$scope,
						dataOptions: that.defaults.moduleVal[0].dataOptions
					});
					// TODO: Potential missed call of the _nextStep. Maybe use try/catch there?
					_nextStep(that);
				});
			} else {
				// Search for current method to call (Now we can use deep call such as: [some.object.with.myDeep.methodName])
				var currentMethod = moduleName;
				$.each(methodToCall.split('.'), function(k, v) {
					currentMethod = currentMethod[v];
				});

				currentMethod.apply(moduleName, that.defaults.moduleVal);
				_nextStep(that);
			}
		});
	}


	function _extendAjaxData(that) {
		var data = that.defaults.data; // Need for eval(v.data);
		$(that.defaults.moduleVal[0]).each(function(k, v) {
			// Fix problem with repeated eval for string with try/catch
			try {
				that.defaults.moduleVal[0][k].data = eval(v.data);
			} catch (err) {
				that.defaults.moduleVal[0][k].data = v.data;
			}
		});
	}


	function _nextStep(that) {

		if(that.defaults.mStep < that.defaults.mStepLimit) {
			that._fireModule();
		} else {
			if(typeof that.defaults.callback === 'function') { that.defaults.callback(); }
		}
	}
});