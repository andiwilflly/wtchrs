define([], function() {

	return {

		initSlickSlider: function($slider, params) {
			this.slickOptions = {
				_slideWidth: 280,    // Set width of each slider
				_fixDots: true,      // Fix problem with click of the last dots link
				_cloneDotsTo: false, // Don`t need to clone dots as default

				arrows: true,
				asNavFor: null,
				draggable: true,
				rtl: ($('body').hasClass('rtl')),
				useCSS: true,
				dots: false,
				infinite: false,
				autoplay: false,
				cssEase: 'ease', // ease|linear|ease-in|ease-out|ease-in-out|cubic-bezier()|initial|inherit
				speed: 500,
				slidesToShow: 3,
				slidesToScroll: 3,
				prevArrow: '<a class="slick-prev slick-control"></a>',
				nextArrow: '<a class="slick-next slick-control"></a>',
				customPaging: function(slider, i) {
					return '<div></div>';
				}
			};

			if (!!params) {
				this.updateSlickOptions(params);
				// Extend default Slick Slider options with settings from admin panel
				this.slickOptions = $.extend(this.slickOptions, params.slickOptions);
			}

			// Add custom Slick Slider events
			this.bindEvents($slider);


			// Init slick slider with extended options
			$slider.slick(this.slickOptions);
		},


		updateSlickOptions: function(params) {
			this.slickOptions.appendArrows = $(params.slickId + params.contentUid).find('.js-arrows');

			// Nedd to add current Slick slider id before each [responsive] [appendArrows] param and make jQuery DOM el
			if (!!params.slickOptions.responsive) {
				$.each(params.slickOptions.responsive, function(k, v) {
					v.settings.appendArrows = $(params.slickId + params.contentUid).find(v.settings.appendArrows);
				});
			}
		},


		bindEvents: function($slider) {
			var LIB = this;
			var libSlickSlider = this;
			var lastDotClicked = false;

			// Init jQuery UI tooltip for all tooltips of Slider
			$slider.find('.js-ui-tooltip').tooltip({
				position: {my: "top", at: "top-30"}
			});

			$slider.on('click', '.slick-dots li:last', function(e) {
				lastDotClicked = true; // Flag for Slick slider afterChange callback
			});

			$slider.on('init', function(event, slick, currentSlide, nextSlide) {
				libSlickSlider.calculateSliderWidth(slick);
				libSlickSlider.changeCounter(slick);

				// Clone dots and append them to other element if we need it.
				LIB.cloneDots($slider);

				// FOUC
				$slider.parent().animate({opacity: 1}, 700);
			});

			$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
				libSlickSlider.calculateSliderWidth(slick);

				// Clone dots and append them to other element if we need it.
				LIB.cloneDots($slider);
			});

			$slider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
				libSlickSlider.changeCounter(slick);

				// Clone dots and append them to other element if we need it.
				LIB.cloneDots($slider);

				// Fix problem with last dot click event
				if (lastDotClicked && LIB.slickOptions._fixDots) {
					LIB.defer(function() {
						$slider.slick('slickNext');
						lastDotClicked = false;
					});
				}
			});
		},


		calculateSliderWidth: function(slick) {
			var res = (slick.slideCount <= slick.options.slidesToShow) ? slick.slideCount : slick.options.slidesToShow;
			slick.options.slidesToShow = res;
			if(!!slick.options._slideWidth) {
				slick.$slider.parent().width(res * (slick.options._slideWidth));
			}
		},


		changeCounter: function(slick) {
			slick.$slider.parent().find('.js-slider-counter-current').html(slick.currentSlide + 1);
			slick.$slider.parent().find('.js-slider-counter-length').html(slick.slideCount);
		},


		cloneDots: function($slider) {
			if(this.slickOptions._cloneDotsTo) {
				$slider.parent().find(this.slickOptions._cloneDotsTo).html($slider.find('.slick-dots').clone(true));
			}
		}
	}

});