Multiselect
===========

Simple multiple select drop-in replacement with checkboxes.

Features
--------
0.	Standard look & feel; tries to match original multiple select.
0.	Click on any part of the item to select or deselect.
0.	Respects selected state.
0.	Respects disabled state.
0.	Readout original multiple select as normal (using .val()).
0.	Rich rendering of options possible.
0.	Triggers change() on original multiple select.

Usage
-----
0.	Just create a standard HTML multiple select.
0.	Include the multiselect .css and .js files.
0.	Call jQuery multiselect() on any multiple select you want to change.

Options
-------
*	width
	undefined (default): match original component exactly.
	'fit': match original component width plus additional space to fit the checkbox.
	numeric: use the specified amount of pixels.
	css-units: use the specified css-units as-is.
*	height
	undefined (default): match original component exactly.
	numeric: use the specified amount of pixels.
	css-units: use the specified css-units as-is.

Events
------
*	showOption
	Callback function that lets you provide rich text or HTML for an option.
	The callback provides the original text, option value and index number of the option.