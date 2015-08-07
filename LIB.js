define([
	"SmiTemplates/LIB/modules/LIB.$",
	"SmiTemplates/LIB/modules/LIB.main",
	"SmiTemplates/LIB/modules/LIB.applyPlugins",
	"SmiTemplates/LIB/modules/LIB.slickSlider",
	// Custom actions
	"SmiTemplates/LIB/modules/actions/LIB.actions.custom"
], function(_$, main, applyPlugins, slickSlider, actionsCustom) {

	// Define LIB
	var LIB = {};

	// Extend LIB
	LIB = $.extend(LIB,
		_$,
		main,
		applyPlugins,
		slickSlider,
		actionsCustom
	);

	// Export LIB
	return LIB;
});