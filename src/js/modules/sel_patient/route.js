
const bb = require("backbone");
const Radio = require("backbone.radio");
const SelPatientView = require("./view");
const selPatientCollection = require("../../entities/patient/collection");

module.exports = bb.Blazer.Route.extend({

	prepare(routeData) {

      // routeData.selPatient = new selPatientCollection();
      //
      // return routeData.selPatient.fetch({
      //
      // type: "get",
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NDb2RlIjoiVlMyMDE3IiwidmVyaWZ5IjoiVlMyMDE3KCgoIiwic3RhdGlvbklkIjoiNjQ4IiwiZXhwIjoxNDgxODQxODEzLCJpc3MiOiJ2aXN0YS1zdXJnZXJ5LWFwaSIsImF1ZCI6InZpc3RhLXN1cmdlcnktYXBpIiwiaWF0IjoxNDgxODQwMDEzfQ.A6DwW5pEoHvdYirBKFGbwVw-3AHaeHvphUuZGBfmhj4"
      // },
        Radio.request("root", "body", new SelPatientView({}));
      // success: function (response) {
          // Debug
         // console.log("Got response:\n " + JSON.stringify(response));

         // Radio.request("root", "body", new SelPatientView({response}));



      // }});

    // execute(response) {
    //   console.log("Patient Selection API call");
    //   Radio.request("root", "body", new SelPatientView({response}));
    // }

  },
});
