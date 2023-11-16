sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "co.com.ZUI5_TALENTO_LATAM.ZUI5_TALENTO_LATAM.view.",
		autoWait: true
	});
});