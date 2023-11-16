sap.ui.define([], function () {
	"use strict";
	return {

		factoryitem: function () {
			var oColumnListItem;

			oColumnListItem = new sap.m.ColumnListItem({
				type: "Active",
				cells: [
					new sap.m.Text({
						text: "{viewModelComptenciasGeneradasCaracterTable>COMPETENCIA}",
						textAlign: "Center"
					}),

					new sap.m.Text({
						text: "{viewModelComptenciasGeneradasCaracterTable>ITEM}"
					}),

					new sap.m.Text({
						text: "{viewModelComptenciasGeneradasCaracterTable>EXPERIENCIA}"
					}),
					new sap.m.Text({
						text: "{viewModelComptenciasGeneradasCaracterTable>PLAN}"
					}),
					new sap.m.Text({
						text: "{viewModelComptenciasGeneradasCaracterTable>PLAN}"
					}),
				]
			});

			return oColumnListItem;
		}
	};
});