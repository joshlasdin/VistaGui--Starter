const bb = require('backbone');
const mn = require('backbone.marionette');
const Router = require('./router');
const RootView = require('./modules/global/root/view');

module.exports = mn.Application.extend({
    region: '#app',

    onStart() {
        this.router = new Router();
        this.showView(new RootView());

        // Invoke routing
        bb.Intercept.start();
        bb.history.start({ pushState: true });
    },
});
