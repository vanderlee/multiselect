/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery */

/*
 * Multiselect
 *
 * Copyright (c) 2012-2016 Martijn W. van der Lee
 * Licensed under the MIT.
 *
 * More user-friendly multiple selects with extra features.
 * Hides and compliments existing multi-selects, so can function as drop-in replacement.
 */

;(function ($) {
	"use strict";

	var set_state	=	function(state, item, options) {
							item.option.prop('selected', state);
							item.checkbox.prop('checked', state);
							item.container[state? 'addClass' : 'removeClass']('multiselect-selected');
							if (options.markChange) {
								item.container[state === item.selected? 'removeClass' : 'addClass']('multiselect-changed');
								item.container[state === item.selected? 'addClass' : 'removeClass']('multiselect-unchanged');
							}
						},
		is_numeric	=	function(value) {
							return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);
						};

	$.fn.multiselect = function(_options) {
		var options = {
			width:			undefined,	// undefined, 'fit', numeric or css-unit
			height:			undefined,	// undefined, numeric or css-unit
			markChange:		false,
			min:			undefined,
			max:			undefined,

			showOption:		undefined	// callback(text, value, index) for each option
		};

		return this.each( function() {
			var element	= this;

			$(element).hide();

			if (_options) {
				$.extend(options, _options);
			}

			var items				= [];

			var lastClickedIndex	= null;
			var lastState			= null;

			$(window).mouseup(function(event) {
				lastState			= null;
			});

			var handleMouseenter = function(event, index) {
				if (event.which == 1) {
					if (lastState !== null && !items[index].container.is('.multiselect-disabled')) {
						setItemState(lastState, items[index]);
					}
				}
			};

			var handleMousedown = function(event, index) {
				if (event.which == 1) {
					event.stopPropagation();

					var range = null;
					if (event.shiftKey) {
						range = items.slice(Math.min(lastClickedIndex, index), Math.max(lastClickedIndex, index) + 1);
					} else {
						range = [items[index]];
					}

					lastState			= !items[index].container.hasClass('multiselect-selected');
					lastClickedIndex	= index;

					$.each(range, function() {
						if (!this.container.is('.multiselect-disabled')) {
							setItemState(lastState, this);
						};
					});

					select.trigger('change');
				}
			};

			var items			= [];


			var min = 0;
			switch (true) {
				case $(element).is('[min]'):
					min = $(element).attr('min');
					break;
				case typeof options.min !== 'undefined':
					min = options.min;
					break;
				case $(element).is(':not([multiple])'):
					min = 1;
					break;
			}

			var max = 9007199254740992;
			switch (true) {
				case $(element).is('[max]'):
					max = $(element).attr('max');
					break;
				case typeof options.max !== 'undefined':
					max = options.max;
					break;
				case $(element).is(':not([multiple])'):
					max = 1;
					break;
			}
			max = Math.max(max, min);

			var currentIndex	= null;
			var currentState	= null;

			$(window).mouseup(function(event) {
				currentState			= null;
			});

			var allowState			= function(state) {
					if (state && max === 1) {
						$.each(items, function() {
							if (!this.container.is('.multiselect-disabled')
							 && this.container.is('.multiselect-selected')) {
								set_state(false, this, options);
							}
						});
					}



					text = options.showOption(text, item.option.val(), index);
				}
				$('<span>'+text+'</span>').appendTo(item.container);

				items[index] = item;
			});

			// Handle form reset
					var selected = $('.multiselect-selected', select).length;
				});
			});
		});
	};
})( jQuery );
					if (state) {
						if (selected + 1 > max) {
							return false;
						}
					} else {
						if (selected - 1 < min) {
							return false;
						}
					}
					return true;
				},
				handleMouseenter	= function(event, index) {
					if (event.which === 1) {
						if (currentState !== null && !items[index].container.is('.multiselect-disabled') && allowState(currentState)) {
							set_state(currentState, items[index], options);
							$(element).trigger('change');
						}
					}
				},
				handleMousedown		= function(event, index) {
					if (event.which === 1) {
						event.stopPropagation();
