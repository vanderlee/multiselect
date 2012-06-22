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

	var setItemState =	function(state, item) {
							item.option.attr('selected', state);
							item.checkbox.attr('checked', state);
							item.container[state? 'addClass' : 'removeClass']('multiselect-selected');
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

			var width	= options.width == 'fit'?		($(element).width()+24)+'px'
						: is_numeric(options.width)?	options.width+'px'
						: options.width?				options.width
						:								$(element).width()+'px'
						;
			var height	= is_numeric(options.height)?	options.height+'px'
						: options.height?				options.height
						:								$(element).height()+'px'
						;
			var select = $('<div tabindex="0" class="multiselect-select" style="height:'+height+';width:'+width+';"/>')
							.on('selectstart', function(event) { return false; })
							.insertAfter(element);

			$('option', element).each(function(index, option) {
				var mouseenter = function(event) {
					handleMouseenter(event, index);
				};

				var mousedown = function(event) {
					handleMousedown(event, index);
				};

				var item = {
					option:		$(option),					// original option
					selected:	$(option).is(':selected'),	// initial state
					disabled:	$(option).is(':disabled')	// initial state
				};

				item.container	= $('<div class="multiselect-option'+(item.selected ? ' multiselect-selected' : '')+(item.disabled ? ' multiselect-disabled' : '')+'"/>')
									.mousedown(mousedown)
									.mouseenter(mouseenter)
									.appendTo(select)
									;
				item.checkbox	= $('<input type="checkbox"'+(item.selected ? ' checked="checked"' : '')+(item.disabled ? ' disabled="disabled"' : '')+'/>')
									.click(function(event) {
										return false;
									})
									.appendTo(item.container);

				var text		= item.option.text();
				if (typeof options.showOption == 'function') {
					text = options.showOption(text, item.option.val(), index);
				}
				$('<span>'+text+'</span>').appendTo(item.container);

				items[index] = item;
			});

			// Handle form reset
			$(element).closest('form').on('reset', function() {
				// set only this, not actual select?
				$.each(items, function(index, item) {
					setItemState(item.selected, item);
				});
			});
		});
	};
})( jQuery );