sap.ui.define([], function () {
	"use strict";
	return {

		factoryitem: function () {
			var oColumnListItem;

			oColumnListItem = new sap.m.ColumnListItem({
				type: "Active",
				cells: [
					new sap.m.Text({
						text: "{viewModelComptenciasTable>COMPETENCIA}",
						textAlign: "Center"
					}),

					new sap.m.Text({
						text: "{viewModelComptenciasTable>ITEM}"
					}),

					new sap.m.Text({
						text: "{viewModelComptenciasTable>EXPERIENCIA}"
					}),
					new sap.m.Text({
						text: "{viewModelComptenciasTable>PLAN}"
					}),
					new sap.m.Text({
						text: "{viewModelComptenciasTable>PLAN}"
					}),
				]
			});

			return oColumnListItem;
		}
	};
});