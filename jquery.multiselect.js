/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery */

/*
 * Multiselect
 *
 * Copyright (c) 2012 Martijn W. van der Lee
 * Licensed under the MIT.
 *
 * More user-friendly multiple selects with extra features.
 * Hides and compliments existing multi-selects, so can function as drop-in replacement.
 */

(function ($) {
	"use strict";

	var set_state	= function(state, option, checkbox, item) {
						option.attr('selected', state);
						checkbox.attr('checked', state);
						item[state? 'addClass' : 'removeClass']('multiselect-selected');
					}
	,	is_numeric	= function(value) {
						return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);
					}

	$.fn.multiselect = function(_options) {
		var options = {
			width:			undefined	// undefined, 'fit', numeric or css-unit
		,	height:			undefined	// undefined, numeric or css-unit
		,	showOption:		undefined	// callback(text, value, index) for each option
		}

		return this.each( function() {
			var element	= this;

			$(element).hide();

			if (_options) {
				$.extend(options, _options);
			}

			var width	= options.width == 'fit'?		($(element).width()+16)+'px'
						: is_numeric(options.width)?	options.width+'px'
						: options.width?				options.width
						:								$(element).width()+'px'
						;
			var height	= is_numeric(options.height)?	options.height+'px'
						: options.height?				options.height
						:								$(element).height()+'px'
						;
			var select = $('<div tabindex="0" class="multiselect-select" style="height:'+height+';width:'+width+';"/>')
							.insertAfter(element);

			$('option', element).each( function(index, option) {
				var handleClick = function(event) {
					event.stopPropagation();

					if (!$(option).is(':disabled')) {
						set_state(!item.hasClass('multiselect-selected'), $(option), checkbox, item);

						$(option).trigger('change');
					}
				};

				var selected	= $(option).is(':selected');
				var disabled	= $(option).is(':disabled');

				var item		= $('<div class="multiselect-option'+(selected ? ' multiselect-selected' : '')+(disabled ? ' multiselect-disabled' : '')+'"/>')
									.click(handleClick)
									.appendTo(select);

				var checkbox	= $('<input type="checkbox"'+(selected ? ' checked="checked"' : '')+(disabled ? ' disabled="disabled"' : '')+'/>')
									.click(handleClick)
									.appendTo(item);

				var text		= $(option).text();
				if (typeof options.showOption == 'function') {
					text = options.showOption(text, $(option).val(), index);
				}
				var label		= $('<span>'+text+'</span>')
									.appendTo(item);
			});
		});
	};
})( jQuery );