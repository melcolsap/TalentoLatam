sap.ui.define(function () {
	"use strict";
	var fecha = {
		FormatteFecha: function (FECHA_ENVIO) {
			
			if(FECHA_ENVIO){
			var fechaOrg = FECHA_ENVIO.slice(6,8) + '/' + FECHA_ENVIO.slice(4,6) + '/' +  FECHA_ENVIO.slice(0,4);
			return fechaOrg;
			}else{
			return '00000000';
			}
				
			},
			
			
			FormatteFecha2: function (FECHA_ENVIO) {
			console.log(FECHA_ENVIO);
			if(FECHA_ENVIO){
			var fechaOrg = FECHA_ENVIO.slice(6,8) + '.' + FECHA_ENVIO.slice(4,6) + '.' +  FECHA_ENVIO.slice(0,4);
			return fechaOrg;
			}else{
			return '00000000';
			}
				
			}
	};
	return fecha;
}, true);