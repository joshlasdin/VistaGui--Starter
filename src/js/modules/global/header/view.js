const mn = require('backbone.marionette');

module.exports = mn.View.extend({
    tagName: 'nav',
    className: 'navbar-inverse navbar-fixed-top',
    template: require('./template.hbs'),
});
