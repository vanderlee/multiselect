Multiselect
===========
Version v1.2.0

Copyright &copy; 2012-2016 Martijn van der Lee (http://martijn.vanderlee.com).
MIT Open Source license applies.

Simple multiple select drop-in replacement with checkboxes.

Features
--------
*	Standard look & feel; tries to match original multiple select.
*	Click on any part of the item to select or deselect.
*	(De)select by dragging with mouse button down.
*	(De)select ranges by mouse click - shift+click.
*	Respects selected state.
*	Respects disabled state.
*	Rich rendering of options possible.
*	Triggers change() on original multiple select.
*	Recognizes form reset.
*	Readout original multiple select as normal (using .val()).
*	Works for single selects as well.

Download
--------
jQuery v1.6.0 or higher required.

Current version: https://github.com/vanderlee/multiselect/archive/master.zip

Sourcecode on Github: https://github.com/vanderlee/multiselect

Documentation
=============
'.multiselect(options)'
-----------------------
0.	Include the multiselect .css and .js files.
0.	Create a standard HTML multiple select element.
0.	Call `.multiselect()` on the element. Options optional.

### Options

-	width			undefined

>	undefined (default): match original component exactly.

>	'fit': match original component width plus additional space to fit the checkbox.

>	numeric: use the specified amount of pixels.

>	css-units: use the specified css-units as-is.

-	height			undefined

>	undefined (default): match original component exactly.

>	numeric: use the specified amount of pixels.

>	css-units: use the specified css-units as-is.

-	markChange		false

>	if true, options are marked with semi-transparency when unchanged.

-	min				null

>	if specified, you cannot select less than the specified limit. Initially,
	less options may be selected, so make sure you doublecheck any forms that
	rely on this limit.

-	max				null

>	if specified, you cannot select more than the specified limit. Initially,
	more options may be selected, so make sure you doublecheck any forms that
	rely on this limit.

### Events

-	showOption

>	Callback function that lets you provide rich text or HTML for an option.

>	The callback provides the original text, option value and index number of
	the option.

### HTML attributes

-	multiple="multiple"

>	If specified, by default you can select anywhere from zero to all options.

>	If not specified, a single select is assumed where you can only select
	exactly one option.

-	min="<number>"

>	If specified, user cannot select less than the specified number of options.

>	This attribute overwrites the min option and/or multiple="multiple"
	attribute.

-	max="<number>"

>	If specified, user cannot select more than the specified number of options.

>	This attribute overwrites the min option and/or multiple="multiple"
	attribute.
