/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"co/com/ZUI5_TALENTO_LATAM/ZUI5_TALENTO_LATAM/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});