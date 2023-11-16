sap.ui.define([
	"./BaseController",
	"../util/FormatFecha",
	"sap/ui/model/Filter",
	"../util/FactoryGestionCompetenciasREQ",
	"../util/FactoryGestionCompetenciasREQCarac"
], function (Controller, FormatFecha, Filter, FactoryGestionCompetenciasREQ, FactoryGestionCompetenciasREQCarac) {
	"use strict";
	var that;
	return Controller.extend("co.com.ZUI5_TALENTO_LATAM.ZUI5_TALENTO_LATAM.controller.InformacionGeneral", {
		FormatFecha: FormatFecha,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf co.com.ZUI5_TALENTO_LATAM.ZUI5_TALENTO_LATAM.view.InformacionGeneral
		 */
		onInit: function () {
			that = this;
			this.pernr = "";
			
			this.getRouter().getRoute("RouteInfoGeneral").attachPatternMatched(this._onViewMatched, this);

			//Modelo  para indicadr CompetenciasRequeridas 
			this._createViewModelGraphicCompetenciasRequeridas();
			this._createViewModelTableCompetenciasRequeridas();
			this._createViewModelGraphicCompetenciasRequeridasGeneradas();
			this._createViewModelTableCompetenciasRequeridasGeneradas();


		},

		_onViewMatched: function (oEvent) {
			this.pernr = oEvent.getParameter("arguments").PERNR;
			var APLICANDO = oEvent.getParameter("arguments").APLICANDO;

			// this.onBeforeRebind(smartIterlocutores);
			sap.ui.core.BusyIndicator.show();

			this.byId("TextAplicando").setText(APLICANDO);
			 this.byId("Avatar").setSrc("/sap/opu/odata/sap/ZGW_LATAM_SRV/FotoPersonalSet('"+this.pernr+"')/$value");
			var oFilter = new sap.ui.model.Filter("PERNR", sap.ui.model.FilterOperator.EQ, this.pernr);

			//	this.getModel().metadataLoaded().then(function () {

			this.getModel().read("/InfoBasicaSet", {
				filters: [oFilter],
				async: false,
				success: jQuery.proxy(this.onSuccessInfoBasica, this),
				error: jQuery.proxy(this.onErrorInfoBasica, this)
			});

			//	});
		},

		onBeforeRebindEducacion: function (oEvent) {

			var mBindingParams = oEvent.getParameter("bindingParams");
			var oFilter = new sap.ui.model.Filter("PERNR", sap.ui.model.FilterOperator.EQ, this.pernr);

			mBindingParams.filters.push(oFilter);

		},

		onBeforeRebindHistoriaLaboral: function (oEvent) {

			var mBindingParams = oEvent.getParameter("bindingParams");
			var oFilter = new sap.ui.model.Filter("PERNR", sap.ui.model.FilterOperator.EQ, this.pernr);

			mBindingParams.filters.push(oFilter);

		},

		onBeforeRebindCursosTomados: function (oEvent) {

			var mBindingParams = oEvent.getParameter("bindingParams");
			var oFilter = new sap.ui.model.Filter("PERNR", sap.ui.model.FilterOperator.EQ, this.pernr);

			mBindingParams.filters.push(oFilter);

		},

		onBeforeRebindPlanCarrera: function (oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams");
			var oFilter = new sap.ui.model.Filter("PERNR", sap.ui.model.FilterOperator.EQ, this.pernr);

			mBindingParams.filters.push(oFilter);
		},

		onBeforeRebindHistLabMitsu: function (oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams");
			var oFilter = new sap.ui.model.Filter("PERNR", sap.ui.model.FilterOperator.EQ, this.pernr);

			mBindingParams.filters.push(oFilter);
		},

		onSuccessInfoBasica: function (oData, response) {

			var smartEducacion = this.byId("smartEducacionFormal");
			smartEducacion.rebindTable(true);
			var smartHistoriaboral = this.byId("smartHistoriaLaboral");
			smartHistoriaboral.rebindTable(true);
			var smartCursosTomados = this.byId("smartCursosTomados");
			smartCursosTomados.rebindTable(true);
			var smartPlanCarrear = this.byId("smartPlanCarrear");
			smartPlanCarrear.rebindTable(true);
			var smartHistoriaLaboralMitsu = this.byId("smartHistoriaLaboralMitsu");
			smartHistoriaLaboralMitsu.rebindTable(true);

			sap.ui.core.BusyIndicator.hide();

			this.byId("TextRegion").setText(oData.results[0].REGION);
			this.byId("TextEstatus").setText(oData.results[0].ESTATUS);
			this.byId("TextNComp").setText(oData.results[0].COMPANY);
			this.byId("TextNombre").setText(oData.results[0].NOM_EMPLEADO + "(" +  oData.results[0].EDAD + " años )");
			this.byId("TextIDEmpleado").setText(oData.results[0].PERNR);
			this.byId("TextDNI").setText(oData.results[0].DOCUMENTO);
			console.log(oData.results[0]);
			//this.byId("Anio").setText(oData.results[0].);

		},

		_onDateRangeSelectionChange: function () {

		},

		SearchPress: function (oEvent) {
			var periodo = this.byId("idDatePickerFecha").getValue();
			this.byId("TextPeriodo").setText(periodo);
			this.byId("idDatePickerFecha").setValue();
			this.CompetenciasRequeridas(periodo);
			this.CompetenciasRequeridasGeneradas(periodo);
		},
		
		CompetenciasRequeridas :  function(periodo){
			

			//Se crea un filtro para enviarle la informacion al back-end
			var aFilter = [];
			aFilter.push(new Filter("PERNR", "EQ", this.pernr));
			aFilter.push(new Filter("PERIODO", "EQ", periodo));
			aFilter.push(new Filter("CLASE", "EQ", "2"));

			sap.ui.core.BusyIndicator.show();
			this.getModel().read("/CompetenciasReqSet", {
				filters: [aFilter],
				async: false,
				success: jQuery.proxy(this.onSuccessValidateCompetenciasRequeridas, this),
				error: jQuery.proxy(this.onSuccessErrorValidate, this)
			});
		},
		
		CompetenciasRequeridasGeneradas :  function(periodo){
		

			//Se crea un filtro para enviarle la informacion al back-end
			var aFilter = [];
			aFilter.push(new Filter("PERNR", "EQ", this.pernr));
			aFilter.push(new Filter("PERIODO", "EQ", periodo));
			aFilter.push(new Filter("CLASE", "EQ", "1"));

			sap.ui.core.BusyIndicator.show();
			this.getModel().read("/CompetenciasReqSet", {
				filters: [aFilter],
				async: false,
				success: jQuery.proxy(this.onSuccessValidateCompetenciasRequeridasCaracter, this),
				error: jQuery.proxy(this.onSuccessErrorValidate, this)
			});
		},

		onSuccessValidateCompetenciasRequeridas: function (oData, response) {

			//Modelo grafica
			var oViewModel = this.getView().getModel("viewModelComptenciasGrapich");
			//Modelo Tabla 
			var oViewModel2 = this.getView().getModel("viewModelComptenciasTable");
			//var ValuesToTableFirmas;
			var ValuesToGraphCompetencias;

			//Se trae flattenData 
			var Data = this.byId("GraphicCompetenciasRequqeridas");
			// ValuesToGraphFirmas = this.construccionGraficaCompetenciasRequeridas(oData );
			ValuesToGraphCompetencias = this.construccionGraficaCompetenciasRequeridas(oData);
			console.log(ValuesToGraphCompetencias);
			oViewModel.setProperty("/items", ValuesToGraphCompetencias);

			//Se realiza el bind para la grafica 
			Data.bindData({
				path: "/items",
				model: "viewModelComptenciasGrapich"
			});

			//----------------------------------------Para la tabla -----------------------------------------

			// //Se trae la tabla 
			var tabla = this.byId("TableCompetenciasReq");
			oViewModel2.setProperty("/items", oData);

			tabla.bindItems({
				path: "/items/results",
				model: "viewModelComptenciasTable",
				factory: jQuery.proxy(FactoryGestionCompetenciasREQ.factoryitem, this)
			});

			sap.ui.core.BusyIndicator.hide();

		},
		
		onSuccessValidateCompetenciasRequeridasCaracter: function (oData, response) {

			//Modelo grafica
			var oViewModel = this.getView().getModel("viewModelComptenciasGeneradasCaracterGrapich");
			//Modelo Tabla 
			var oViewModel2 = this.getView().getModel("viewModelComptenciasGeneradasCaracterTable");
			//var ValuesToTableFirmas;
			var ValuesToGraphCompetencias;

			//Se trae flattenData 
			var Data = this.byId("GraphicCompetenciasCaracter");
			// ValuesToGraphFirmas = this.construccionGraficaCompetenciasRequeridas(oData );
			ValuesToGraphCompetencias = this.construccionGraficaCompetenciasRequeridasCaracter(oData);
			
			oViewModel.setProperty("/items", ValuesToGraphCompetencias);

			//Se realiza el bind para la grafica 
			Data.bindData({
				path: "/items",
				model: "viewModelComptenciasGeneradasCaracterGrapich"
			});

			//----------------------------------------Para la tabla -----------------------------------------

			// //Se trae la tabla 
			var tabla = this.byId("TableCompetenciasReqCaracter");
			oViewModel2.setProperty("/items", oData);

			tabla.bindItems({
				path: "/items/results",
				model: "viewModelComptenciasGeneradasCaracterTable",
				factory: jQuery.proxy(FactoryGestionCompetenciasREQCarac.factoryitem, this)
			});

			sap.ui.core.BusyIndicator.hide();

		},

		construccionGraficaCompetenciasRequeridas: function (oData) {

			var ValuesToGraph = [];
			var contadorAun  =  0,
				conatdorSi = 0,
				ContadorAceptable = 0,
				ContadoDeficiente = 0;
			oData.results.forEach(function (element) {
				if (element.EXPERIENCIA === "Aún no") {
					contadorAun++;
				} else if (element.EXPERIENCIA === "Sí") {
					conatdorSi++;
				}
			});

			ValuesToGraph.push({
				Denominacion: "Aún no",
				Value: contadorAun
			});

			ValuesToGraph.push({
				Denominacion: "Sí",
				Value: conatdorSi
			});

			
			return ValuesToGraph;

		},


			construccionGraficaCompetenciasRequeridasCaracter: function (oData) {

			var ValuesToGraph = [];
			var contadorAun  =  0,
				conatdorSi = 0,
				ContadorAceptable = 0,
				ContadoDeficiente = 0;
			oData.results.forEach(function (element) {
				if (element.EXPERIENCIA === "Bueno") {
					contadorAun++;
				}  else if (element.EXPERIENCIA === "Aceptable") {
					ContadorAceptable++;
				} else if (element.EXPERIENCIA === "Deficiente") {
					ContadoDeficiente++;
				}
			});

			ValuesToGraph.push({
				Denominacion: "Bueno",
				Value: contadorAun
			});


			ValuesToGraph.push({
				Denominacion: "Aceptable",
				Value: ContadorAceptable
			});

			ValuesToGraph.push({
				Denominacion: "Deficiente",
				Value: ContadoDeficiente
			});
			return ValuesToGraph;

		},
		onSuccessErrorValidate: function () {
			console.log("holi!!!");
		},

		onErrorInfoBasica: function () {
			console.log("holi!!!");

		},

		_createViewModelGraphicCompetenciasRequeridas: function () {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				items: []
			});
			this.getView().setModel(oModel, "viewModelComptenciasGrapich");

		},

		_createViewModelTableCompetenciasRequeridas: function () {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				items: []
			});
			this.getView().setModel(oModel, "viewModelComptenciasTable");
		},
		
		_createViewModelGraphicCompetenciasRequeridasGeneradas: function () {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				items: []
			});
			this.getView().setModel(oModel, "viewModelComptenciasGeneradasCaracterGrapich");

		},

		_createViewModelTableCompetenciasRequeridasGeneradas: function () {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				items: []
			});
			this.getView().setModel(oModel, "viewModelComptenciasGeneradasCaracterTable");
		}
		
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf co.com.ZUI5_TALENTO_LATAM.ZUI5_TALENTO_LATAM.view.InformacionGeneral
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf co.com.ZUI5_TALENTO_LATAM.ZUI5_TALENTO_LATAM.view.InformacionGeneral
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf co.com.ZUI5_TALENTO_LATAM.ZUI5_TALENTO_LATAM.view.InformacionGeneral
		 */
		//	onExit: function() {
		//
		//	}

	});

});