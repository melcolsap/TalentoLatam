sap.ui.define([
	"co/com/ZUI5_TALENTO_LATAM/ZUI5_TALENTO_LATAM/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/m/MessageToast',
	"../util/FormatFecha",
], function (Controller, Filter, FilterOperator, MessageToast, FormatFecha) {
	"use strict";

	return Controller.extend("co.com.ZUI5_TALENTO_LATAM.ZUI5_TALENTO_LATAM.controller.Main", {
		FormatFecha: FormatFecha,
		onInit: function () {
			this.pernr = '';
			this.paisResidencia = '';
			this.aplicando = '';
		},

		EnviarInfo: function () {
			var validacion;
			validacion = this.ValidarCamposObligatorios();
			var smartEjecutivos = this.byId("smartEjecutivos");
			if (validacion == true) {
				this.byId("idDatePickerFecha").setValueState("None");
				this.byId("IdComboNomCom").setValueState("None");
				this.byId("InputEjecutivo").setValueState("None");
				this.byId("InputAplicando").setValueState("None");
				this.byId("ComboAplicandoPais").setValueState("None");

				smartEjecutivos.rebindTable(true);

			} else {
				sap.m.MessageBox.warning("Campo de periodo obligatorio y colocar al menos uno de los campos siguientes", {
					title: "Advertencia", // default
					onClose: null, // default
					styleClass: "", // default
					initialFocus: null, // default
					textDirection: sap.ui.core.TextDirection.Inherit // default
				});

			}
		},

		onPais: function (oEvent) {
			//	console.log(oEvent.selectedKey());
			var pais = this.byId("ComboAplicandoPais");
			this.paisResidencia = pais.getSelectedKey();

		},

		onAplicando: function (oEvent) {
			var aplicando = this.byId("InputAplicando");
			this.aplicando = aplicando.getSelectedKey();
		},

		onBeforeRebind: function (oEvent) {

			var nEmpresa = this.byId("IdComboNomCom").getValue(); //this.getModel("viewModel").getProperty("/contrato");

			var mBindingParams = oEvent.getParameter("bindingParams");
			if (nEmpresa) {
				var oFilter = new sap.ui.model.Filter("TEXTO", sap.ui.model.FilterOperator.EQ, nEmpresa);
				mBindingParams.filters.push(oFilter);
			}

			if (this.pernr) {
				var oFilter = new sap.ui.model.Filter("PERNR", sap.ui.model.FilterOperator.EQ, this.pernr);
				mBindingParams.filters.push(oFilter);
			}

			if (this.aplicando) {
				var oFilter = new sap.ui.model.Filter("ID_PUESTO", sap.ui.model.FilterOperator.EQ, this.aplicando);
				mBindingParams.filters.push(oFilter);
			}

			if (this.paisResidencia) {
				var oFilter = new sap.ui.model.Filter("PAIS", sap.ui.model.FilterOperator.EQ, this.paisResidencia);
				mBindingParams.filters.push(oFilter);
			}

			console.log(mBindingParams.filters);

			// var oFilter = new sap.ui.model.Filter("ID_COMPANY", sap.ui.model.FilterOperator.EQ, nContrato);
			// mBindingParams.filters.push(oFilter);

			// var oFilter = new sap.ui.model.Filter("ID_COMPANY", sap.ui.model.FilterOperator.EQ, nContrato);
			// mBindingParams.filters.push(oFilter);

			// var oFilter = new sap.ui.model.Filter("ID_COMPANY", sap.ui.model.FilterOperator.EQ, nContrato);
			// mBindingParams.filters.push(oFilter);
			// // mBindingParams.parameters["expand"] = "Interlocutores";

		},

		ValidarCamposObligatorios: function () {
			var Val_anio;

			var Val_anio = this.validarloscampos("idDatePickerFecha", "Error");
			var Val_nombreCom = this.validarloscampos("IdComboNomCom", "Warning");
			var Val_ejecutivo = this.validarloscampos("InputEjecutivo", "Warning");
			var Val_aplicando = this.validarloscampos("InputAplicando", "Warning");
			var Val_pais = this.validarloscampos("ComboAplicandoPais", "Warning");

			if (Val_anio == false) {
				return false;
			} else {

				if (Val_nombreCom == false && Val_ejecutivo == false && Val_aplicando == false && Val_pais == false) {
					return false;
				} else {
					return true;
				}
			}
		},

		onSearchEjecutivo: function (oEvent) {
			var t = oEvent.getSource().getValue();
			if (!this._pValueHelpDialog) {
				this._pValueHelpDialog = sap.ui.xmlfragment("co.com.ZUI5_TALENTO_LATAM.ZUI5_TALENTO_LATAM.view.SearchEjecutivo", this);
				this.getView().addDependent(this._pValueHelpDialog);
			}
			this._pValueHelpDialog.open(t);
		},

		onSearch: function (oEvent) {

			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("NAME", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getParameter("itemsBinding");
			oBinding.filter([oFilter]);
		},

		onDialogClose: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem"),
				oInput = this.byId("InputEjecutivo");

			var oComboAplicando = this.byId("InputAplicando");

			oInput.setValue(oSelectedItem.getTitle());
			this.pernr = oSelectedItem.getDescription();
			// //se crea un template para definir los items del combo 
			// var oItemTemplate = new sap.ui.core.ListItem({
			// 	text: "{PUESTO}",
			// 	key: "{ID}"
			// });

			// var aFilter = [];
			// aFilter.push(new Filter("ID", "EQ", oSelectedItem.getDescription()));
			// try {

			// 	oComboAplicando.bindItems({
			// 		path: "/PuestosAplicarSet",
			// 		template: oItemTemplate,
			// 		filters: aFilter
			// 	});

			// } catch (err) {
			// 	//	console.log("Seleccion Cancelada");
			// }

		},

		clearFiltrosIniciales: function () {
			this.byId("idDatePickerFecha").setValue("");
			this.byId("IdComboNomCom").setValue("");
			this.byId("InputEjecutivo").setValue("");
			this.byId("InputAplicando").setValue("");
			this.byId("ComboAplicandoPais").setValue("");
			this.pernr = "";
			this.aplicando = "";
			this.paisResidencia = "";

		},
		validarloscampos: function (idO, estado) {

			var Oisbn = this.byId(idO);
			if (!Oisbn.getValue()) {
				this.mostarElEsstado(Oisbn, "campo obligatorio", estado);
				return false;
			} else {
				this.mostarElEsstado(Oisbn, "", estado);
				return true;

			}
		},

		onRowSelectionChange: function (oEvent) {
			var pernr = '20000001';
			var oItems, oCtx;
			if (oEvent.sId != 'itemPress') {
				oItems = oEvent.getSource();
			}
			if (oItems) {
				var oCell = oItems.getCells();
				oCtx = oItems.getBindingContext().getObject();
			}

			console.log(oCtx);

			//console.log(oCtx.getObject());
			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oCtx.POSICION = oCtx.POSICION.replace('/', '-');
			this.getOwnerComponent().getRouter().navTo("RouteInfoGeneral", {
				PERNR: oCtx.PERNR,
				APLICANDO: oCtx.POSICION

			});

		},
		mostarElEsstado: function (oControl, msg, estado) {

			if (msg) {
				oControl.setValueState(estado);
				oControl.setValueStateText(msg);
			} else {
				oControl.setValueState("None");
				oControl.setValueStateText("");
			}

		},
	});
});