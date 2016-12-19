const Marionette = require("backbone.marionette");
const API        = require("../../api");
const PatientIdModel = require("../../entities/sel_patient/patient_id/model");
const PatientSSNModel = require("../../entities/sel_patient/patient_ssn/model");
// const PatientLastFiveModel = require("../../entities/sel_patient/patient_last_five/model");

module.exports = Marionette.View.extend({
  //className: "starter-template",
  template: require("./template.hbs"),

  ui: {
    modalxxx: "#myModal"
  },

  events: {

    // TODO: (By Praveen) - Once data is entered in any one field, disable the others. But if the user deletes
    // what they entered, re-enable the other fields. Do this for each of the three fields. It would have to be
    // implemented here in events, and would involve the event, field ID, and function as below.

    // Handle modal window form submit button click
    "click #selectPatientButton": function (e) {

      var patientId = $('#PatientId').val();
      var patientSSN = $('#PatientSSN').val();
      var patientLast5 = $('#PatientLast5').val();

      // Debug
      console.log("patient id: " + patientId);
      console.log("patient ssn: " + patientSSN);
      console.log("patient last5: " + patientLast5);

      // Display error message underneath login fields for one and a half second if all fields are empty
      if (patientId === "" && patientSSN === "" && patientLast5 === "") {

        var message = "Please enter relevant data";
        $("#PatientLast5Div").after("<div id='piMsgDiv' class='piMsg piMsgError'>" + message + "</div>");
        $("#piMsgDiv").fadeIn().delay(1500).fadeOut();

      } else {

        $('#spinner').show();

        var patientById = null;
        var patientBySSN = null;
        //var patientByLastFive = null;

        // Determine what API call to make based on user input (This logic was originally implemented by Praveen)
        if (patientId.length > 0) {
          patientById = new PatientIdModel();
          patientById.urlRoot = API.getURL('PatientId') + patientId;
        }
        else if (patientSSN.length > 0) {
          patientBySSN = new PatientSSNModel();
          patientBySSN.urlRoot = API.getURL('PatientSSN') + patientSSN;
        }
        //else {
        //  patientByLastFive = new PatientByLastFiveModel();
        //  patientByLastFive.urlRoot = API.getURL('PatientLastFive') + patientSSN;
        //}

        // Get the patient info by their ID
        if (patientById != null) {

          // This is a straight GET API call. Note that an access token is needed in the Aughorization header for this call.
          patientById.fetch({
            type: "get",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": localStorage.getItem("access_token")
            },

            success: function (response) {

              $('#spinner').hide();

              // Debug
              console.log("Got patient ID based response:\n " + JSON.stringify(response));

              // Get a handle to element in the main window
              var piContent = $("#piContent");
              piContent.empty();

              // Put response items into variables
              var patientName = properCase(response.get("name"));
              var dobRaw = new Date(response.get('dob'));
              var dob = dobRaw.getMonth() + "/" + dobRaw.getDay() + "/" + dobRaw.getUTCFullYear();
              var age = response.get('age') + "y";
              var gender = (response.get('gender') === 'M') ? "Male" : "Female";
              var ssnRaw = response.get('ssn');
              var ssn = ssnRaw.substring(0, 3) + "-" + ssnRaw.substring(3, 5) + "-" + ssnRaw.substring(5, ssnRaw.length);
              var pid = response.get("localPid");

              // Patient image - hard coded
              if (patientId == 5)
                piContent.append("<div id='patient-image-container' class='patient-detail-head'><div aria-hidden='true' class='patient-image' id='patient-image' style='background-image: url(&quot;data:image/jpeg;base64,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&quot;);'></div> </div>");
              else
                piContent.append("<div id='patient-image-container' class='patient-detail-head'><div aria-hidden='true' class='patient-image' id='patient-image' style='background-image: url(&quot;data:image/jpeg;base64,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&quot;);'></div> </div>");

              // List the response items in the main window.
              piContent.append("<div class='patient-name'>" + patientName + "</div>");
              piContent.append("<div class='rowModal'><div class='infoLabelStyle'>DOB:</div><div class='col-xs-6'>" + dob + "</div></div>");
              piContent.append("<div class='rowModal'><div class='infoLabelStyle'>Age:</div><div class='col-xs-6'>" + age + "</div></div>");
              piContent.append("<div class='rowModal'><div class='infoLabelStyle'>Gender:</div><div class='col-xs-6'>" + gender + "</div></div>");
              piContent.append("<div class='rowModal'><div class='infoLabelStyle'>SSN:</div><div class='col-xs-6'>" + ssn + "</div></div>");

              // Remove the modal window once the result to allow user to see the result in the middle of the screen
              $('#myModal').modal('hide');
            },

            error: (function () {

              $('#spinner').hide();

              // Display error message underneath login fields for one and a half second
              var message = "Invalid data entered or token expired";
              $("#PatientLast5Div").after("<div id='piMsgDiv' class='piMsg piMsgError'>" + message + "</div>");
              $("#piMsgDiv").fadeIn().delay(1500).fadeOut();
            })
          });
        }

        // Get the patient info by their SSN
        if (patientBySSN != null) {

          // This is a straight GET API call. Note that an access token is needed in the Aughorization header for this call.
          patientBySSN.fetch({
            type: "get",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": localStorage.getItem("access_token")
            },

            success: function (response) {

              $('#spinner').hide();

              // Debug
              console.log("Got patient SSN based response:\n " + JSON.stringify(response));

              // Get a handle to element in the main window
              var piContent = $("#piContent");
              piContent.empty();

              // TODO: It's odd. The SSN call returns an array but SSNs are unique to every person so this call
              // should not be returning an array. Ask the API guys why this is so. Below is an implementation
              // of how we might handle an array (commented out). But for now, we are just grabbing the zeroth
              // element of the array.

              // This is a possible implementation of how we might want to handle an result list of patients
              /*
               var patientBySSNArray = [];
               var index = 0;
               while(typeof response.get(index) !== 'undefined') {
                  patientBySSNArray[index] = response.get(index).name + "-" + response.get(index).dfn;
                  index++;
               }
               patientBySSNArray.sort(); // Sort the facilities array in alphabetical order
              */

              if(response.get(0) != null) {

                // Put response items into variables
                var patientName = properCase(response.get(0).name);
                var dfn = response.get(0).dfn;
                var pid = response.get(0).localPid;

                // Patient image - hard coded
                if (patientId == 5)
                  piContent.append("<div id='patient-image-container' class='patient-detail-head'><div aria-hidden='true' class='patient-image' id='patient-image' style='background-image: url(&quot;data:image/jpeg;base64,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&quot;);'></div> </div>");
                else
                  piContent.append("<div id='patient-image-container' class='patient-detail-head'><div aria-hidden='true' class='patient-image' id='patient-image' style='background-image: url(&quot;data:image/jpeg;base64,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&quot;);'></div> </div>");

                // List the response items in the main window.
                piContent.append("<div class='patient-name'>" + patientName + "</div>");
                piContent.append("<div class='rowModal'><div class='infoLabelStyle'>DFN:</div><div class='col-xs-6'>" + dfn + "</div></div>");
                piContent.append("<div class='rowModal'><div class='infoLabelStyle'>Local PID:</div><div class='col-xs-6'>" + pid + "</div></div>");

                // Remove the modal window once the result to allow user to see the result in the middle of the screen
                $('#myModal').modal('hide');

              } else {

                // Display error message underneath login fields for one and a half second
                var message = "Invalid data entered or token expired";
                $("#PatientLast5Div").after("<div id='piMsgDiv' class='piMsg piMsgError'>" + message + "</div>");
                $("#piMsgDiv").fadeIn().delay(1500).fadeOut();

              }

            },

            error: (function () {

              $('#spinner').hide();

              // Display error message underneath login fields for one and a half second
              var message = "Invalid data entered or token expired";
              $("#PatientLast5Div").after("<div id='piMsgDiv' class='piMsg piMsgError'>" + message + "</div>");
              $("#piMsgDiv").fadeIn().delay(1500).fadeOut();
            })
          });
        }

        // For Praveen to implement - Get the patient info by the last five characters
        //if (patientByLastFive != null) {

            // Make up the model and collection based on this API call's JSON response. Do this in the entities/sel_patient/patient_last_five folder. Follow the same pattern as the patient_id model and collection.
            // Fill in the code for this model's (patientByLastFive) fetch here according to the pattern of patientById or patientBySSN above (depending on whether API JSON result is an array or not)
            // The plumbing code for patientByLastFive is stubbed out for you already in this class. You just need to uncomment it (i.e., look at lines 5 and 57).
            // Then implement the fetch call for the pathentByLastFive model right here, following what was done above.

        //}

      } // Closes if fields are not empty else block

      // In case the spinner has not closed...
      $('#spinner').hide();

    } // Closes click event

  }, // Closes events

  templateContext() {
    return {
      action: API.getURL("Authenticate")
    };
  },

  onAttach: function() {
    if(localStorage.getItem("access_token") == null)
      alert("Please log in first by selecting Login link");
    else
      this.ui.modalxxx.modal('show');
  },

});

// TODO: Find a good place for oft used utility functions that can be called statically
// Utility function
function properCase(value) {
  return value.replace(/\b(\w)(\w*)?\b/g, function() {
    return arguments[1].toUpperCase() + arguments[2].toLowerCase();
  });
}
