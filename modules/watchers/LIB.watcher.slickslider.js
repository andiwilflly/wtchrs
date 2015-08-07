/**
 * @SOURCE:
 * http://kenwheeler.github.io/slick/
 * https://github.com/kenwheeler/slick
 *
 *
 * @EXAMPLE:
 * <div id="slick-default-inner-img" data-slick='{
 *      "_slideWidth": 100,
 *      "dots": false,
 *      "slidesToShow": 1,
 *      "slidesToScroll": 1,
 *      "appendArrows": ".js-tablet-arrowss"
 *}'>
 */

define([
	"SmiTemplates/LIB/LIB"
], function(LIB) {

	return function() {

		this.apply = function() {
            var that = this;

            LIB.initSlickSlider(that.$el, {
                    slickOptions: this.defaults.dataOptions
                }
            );

            that.$el.parent().css('opacity', 1);
		};
    };
});
