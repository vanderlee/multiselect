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
			width:		undefined		// same
		,	height:		undefined		// same
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
			var select = $('<div tabindex="0" class="multiselect-select" style="height:'+height+';width:'+width+';"/>').insertAfter(element);

			$('option', element).each( function(_index, _option) {
				var handleClick = function(event) {
					event.stopPropagation();
					set_state(!item.hasClass('multiselect-selected'), $(_option), checkbox, item);

					$(_option)
					.trigger('change');
				};

				var state		= $(_option).is(':selected');
				var item		= $('<div class="multiselect-option'+(state ? ' multiselect-selected' : '')+'"/>')
									.click(handleClick)
									.appendTo(select);
				var checkbox	= $('<input type="checkbox"'+(state ? ' checked="checked"' : '')+'/>')
									.click(handleClick)
									.appendTo(item);
				var $label		= $('<span>'+$(_option).text()+'</span>')
									.appendTo(item);
			});
		});
	};
})( jQuery );