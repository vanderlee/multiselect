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

	var setItemState =	function(state, option, checkbox, container) {
							option.attr('selected', state);
							checkbox.attr('checked', state);
							container[state? 'addClass' : 'removeClass']('multiselect-selected');
						},
		is_numeric =	function(value) {
							return (typeof(value) === 'number' || typeof(value) === 'string') && value !== '' && !isNaN(value);
						}

	$.fn.multiselect = function(_options) {
		var options = {
			width:			undefined,	// undefined, 'fit', numeric or css-unit
			height:			undefined,	// undefined, numeric or css-unit
			showOption:		undefined	// callback(text, value, index) for each option
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

			var lastClickedIndex	= null;
			var lastState			= null;

			var items = [];

			$(window).mouseup( function(event) {
				lastState	 = null;
			});

			$('option', element).each( function(index, option) {
				var handleMousedown = function(event) {
					event.stopPropagation();

					var range = null;
					if (event.shiftKey) {
						range = items.slice(Math.min(lastClickedIndex, index), Math.max(lastClickedIndex, index) + 1);
					} else {
						range = [item];
					}

					lastState = !item.container.hasClass('multiselect-selected');

					$.each(range, function() {
						if (!this.container.is('.multiselect-disabled')) {
							setItemState(lastState, this.option, this.checkbox, this.container);
						};
					});

					select.trigger('change');

					lastClickedIndex = index;
				};

				var handleMouseenter = function(event) {
					if (event.which == 1) {
						if (lastState !== null) {
							setItemState(lastState, item.option, item.checkbox, item.container);
						}
					}
				};

				var item = {
					option:		$(option)
				};

				var selected	= item.option.is(':selected');
				var disabled	= item.option.is(':disabled');

				item.container	= $('<div class="multiselect-option'+(selected ? ' multiselect-selected' : '')+(disabled ? ' multiselect-disabled' : '')+'"/>')
									.mousedown(handleMousedown)
									.mouseenter(handleMouseenter)
									.appendTo(select)
									;
				item.checkbox	= $('<input type="checkbox"'+(selected ? ' checked="checked"' : '')+(disabled ? ' disabled="disabled"' : '')+'/>')
									.mousedown(handleMousedown)
									.mouseenter(handleMouseenter)
									.appendTo(item.container);

				var text		= item.option.text();
				if (typeof options.showOption == 'function') {
					text = options.showOption(text, item.option.val(), index);
				}
				$('<span>'+text+'</span>').appendTo(item.container);

				items.push(item);
			});
		});
	};
})( jQuery );