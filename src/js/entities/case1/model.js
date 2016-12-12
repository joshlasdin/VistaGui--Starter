const Backbone  = require("backbone");
const API       = require("../../api");

module.exports = Backbone.Model.extend({
	urlRoot: API.getURL("Case"),
	defaults: {
		ien: "",
		description: "",
		caseCreateDate: new Date(),
		surgicalCaseDate: "",
		primarySurgePrimary: "",
		attendingSurgeons: "",
		surgicalSpecialty: "",
		principalPreOpDiagnosis: "",
		principalPreOpICD: "",
		otherPreOpDiagnosis: "",
		plannedPrincOpProc: "",
		plannedPrincOpProcCPT: "",
		palliation: "",
		otherProcedures: "",
		surgeryPosition: "",
		procedureLaterality: "",
		reqAneTechnique: "",
		caseStatus: "",
		preOpInfection: "",
		hospitalAdmissionStatus: "",
		plannedPostOpCare: "",
		pharmacyItems: "",
		plannedProsthImplant: "",
		specialEquipment: "",
		specialInstruments: "",
		specialSupplies: "",
		briefClinicalHistory: ""
	}
});
