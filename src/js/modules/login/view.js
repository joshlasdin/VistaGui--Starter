const Marionette = require("backbone.marionette");
const API        = require("../../api");
const Radio     = require("backbone.radio");
const AboutView = require("../about/view");
const AuthenticateModel = require("../../entities/login/model");

module.exports = Marionette.View.extend({
	//className: "starter-template",
	template: require("./template.hbs"),
    ui: {
		modalxxx: "#myModal"
	},

  events: {

	  // Not working completely well
    "keyup #loginBtn": function (e) {
      // Capture ENTER key press
      var code = e.keyCode || e.which;
      if(code == 13) {
        $("#loginBtn").click();
      }
    },

    // Get the login's access token and store it for later API calls
    "click #loginBtn": function (e) {

      $('#spinner').show();

      var access = $('#accessCode').val();
      var verify = $('#verifyCode').val();
      var stationId = $('#selectedFacility').val();

      // Debug
      //console.log("access code: " + access);
      //console.log("verify code: " + verify);
      //console.log("station id: " + stationId);

      // Get the access token
      var accessTokenInfo = new AuthenticateModel();

      // This is a post API call with the credentials in the body of the message (i.e., the data section below)
      accessTokenInfo.fetch({
        type: "post",
        dataType: "json",
        processData: true,

        data: {
          access: access,
          verify: verify,
          stationId: 648
        },

        success: (function (response) {

          $('#spinner').hide();

          // Debug
          //console.log("Got response:\n " + JSON.stringify(response));
          console.log("Access token: " + response.get("token"));

          // Put access token and the login info into local storage for later retrieval
          localStorage.setItem('access_token', response.get("token"));
          localStorage.setItem('access', access);
          localStorage.setItem('verify', verify);
          localStorage.setItem('stationId', stationId);

          // Display a brief login successful message, redirect to About page, thereby removing modal window & backdrop
          $("#verifyCodeDiv").after("<div id='loginMsgDiv' class='loginMsg loginMsgSuccess'>Login successful</div>");
          $("#loginMsgDiv").fadeIn().delay(300).fadeOut(function(){
            Radio.request("root", "body", new AboutView({})); // Redirect to About view
            $('.modal-backdrop').remove(); // Remove modal backdrop
          });
        }),

        error: (function () {

          $('#spinner').hide();

          // Compose message based on what was entered by user
          var message = "Invalid credentials";
          if(access === "" || verify === "")
          {
            message = "Plase enter data into all fields";
          }

          // Display error message underneath login fields for one and a half second
          $("#verifyCodeDiv").after("<div id='loginMsgDiv' class='loginMsg loginMsgError'>" + message + "</div>");
          $("#loginMsgDiv").fadeIn().delay(1500).fadeOut();
        })

      });

      // In case the spinner has not closed...
      $('#spinner').hide();
    }

  },

	templateContext() {
		return {
			action: API.getURL("Authenticate"),
			facilities: this.getOption('facilities').toJSON(),
		};
	},

	onAttach: function() {
		this.ui.modalxxx.modal('show');
	}
});
