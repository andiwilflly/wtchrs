define([
], function() {

	return {

		/**
		 *  Initialize SelectBox plugin for current $el
		 *  http://www.bulgaria-web-developers.com/projects/javascript/selectbox
		 *  @param {object} $el - jQuery DOM element
		 *  @param {object} settings
		 */
		selectbox: function($el, settings) {
			$el = $($el);
			settings = settings || {};
			$el.selectbox('detach').selectbox(settings);
		},

		/**
		 *  Initialize SelectBox plugin
		 *  http://www.bulgaria-web-developers.com/projects/javascript/selectbox
		 *  @param {object} that - module instance
		 */
		_initSelectBoxes: function(that) {
			that.$el.find('select').selectbox({
				onChange: jQuerySelectBox_onChange_helper, // Fix problem with FF browser [selected] options
				onOpen: jQuerySelectBox_onOpen_helper // Hide selected option from select box
			});
		},

		/**
		 * Change jQuery UI multiSelect position on window resize event
		 * SOURCE: http://www.erichynds.com/examples/jquery-ui-multiselect-widget/demos/
		 * @param {object} $select - jQuery select
		 */
		reInitCustomSelect: function($select) {
			this.onWindowResize(function() {
				$select.multiselect("position");
			}, 100);
		},

		/**
		 *  Initialize jQuery prettyCheckable plugin*
		 *  http://arthurgouveia.com/prettyCheckable
		 *  @param {object} that - module instance
		 */
		_initPrettyCheckable: function(that) {
			if( that.$el.is('input') ){
				that.$el.prettyCheckable();
			} else {
				that.$el.find('input[type="radio"], input[type="checkbox"]').prettyCheckable();
			}
		},

		/**
		 *  Initialize jQuery UI Accordion
		 *  http://api.jqueryui.com/accordion
		 *  @param {object} $el - jQuery DOM element
		 */
		_joinAccordion: function($el) {
			$el = $($el);
			$el.accordion({
				collapsible: true,
				heightStyle: "content"
			});
		},


		/**
		 *  Initialize jQuery UI Accordion with collapsed items
		 *  @param {object} $el - jQuery DOM element
		 */
		_joinAccordionCollapsed: function($el) {
			$el.accordion({
				collapsible: true,
				active: false,
				heightStyle: "content"
			});
		},


		/**
		 *  Initialize jQuery UI Accordion with wrapper for each Accordion item
		 *  @param {object} $el - jQuery DOM element
		 *  @param {string} wrapper - jQuery UI accordion title wrapper string
		 */
		_joinAccordionWrapped: function($el, wrapper, collapsible, active) {
			wrapper = wrapper || '> .accordion__wrap > .accordion__title';
			collapsible = collapsible || false;
			active = active || 0;

			$el.accordion({
				header: wrapper,
				collapsible: collapsible,
				heightStyle: "content",
				active: active
			});
		},

		/**
		 *  Initialize jQuery UI Accordion with open multiple panels at once
		 *  @param {object} $el - jQuery DOM element
		 */
		_joinAccordionMultiplePanelsOpen: function($el) {
			$el.accordion({
				heightStyle: "content",
				collapsible: true,
				beforeActivate: function(event, ui) {
					// The accordion believes a panel is being opened
					if (ui.newHeader[0]) {
						var currHeader  = ui.newHeader;
						var currContent = currHeader.next('.ui-accordion-content');
						// The accordion believes a panel is being closed
					} else {
						var currHeader  = ui.oldHeader;
						var currContent = currHeader.next('.ui-accordion-content');
					}
					// Since we've changed the default behavior, this detects the actual status
					var isPanelSelected = currHeader.attr('aria-selected') == 'true';

					// Toggle the panel's header
					currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));

					// Toggle the panel's icon
					currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);

					// Toggle the panel's content
					currContent.toggleClass('accordion-content-active',!isPanelSelected);
					if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }

					return false; // Cancel the default action
				}
			});
		},

		/**
		 * Extend default jQuery UI dialog options and return object of options
		 * @param {object} options - custom options for dialog
		 */
		extendJqueryUiDialogOptions: function(options) {
			var optionsDefault = {
				htmlTitle: true,
				draggable: false,
				resizable: false,
				modal: true,
				autoOpen: false,
				position: {
					my: "center",
					at: "center"
				},
				show: {
					effect: "fade",
					delay: 400
				},
				hide: "fade"
			};

			return options = $.extend(optionsDefault, options) || optionsDefault;
		},


		/**
		 * Init jQuery UI dialog and open when dialog is init
		 * @param {object} isDialogInit - default may be set Null
		 * @param {function} callback - function which init dialog and redefine variable isDialogInit = $(dialog)
		 * @param {object} $dialog - jQuery object of dialog
		 */
		initDialog: function(isDialogInit, callback, $dialog) {
			if( isDialogInit === null ) {
				callback($dialog);
			} else {
				isDialogInit.dialog("open");
			}
		}
	}
});