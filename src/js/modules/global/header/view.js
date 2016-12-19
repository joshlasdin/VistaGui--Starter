const mn = require("backbone.marionette");

module.exports = mn.View.extend({
	tagName: "nav",
	className: "navbar navbar-fixed-top",
	template: require("./template.hbs"),

  events: {
    "click #selPatientNavLink": function(e) {
      if(localStorage.getItem("access_token") == null)
        alert("Please log in first by selecting Login link");
      else
        $("#myModal").modal('show');
    }
  }

});
