const bb = require('backbone');
const AboutRoute      = require('./modules/about/route');
const Case1Route      = require('./modules/case1/route');
const LoginRoute      = require('./modules/login/route');
const SelPatientRoute = require('./modules/sel_patient/route');
const IndexRoute      = require('./modules/index/route');
const PostsRoute      = require('./modules/posts/route');
const PostRoute       = require('./modules/post/route');

module.exports = bb.Blazer.Router.extend({
    routes: {
        '': new IndexRoute(),
        'about/': new AboutRoute(),
        'case1/': new Case1Route(),
        'login/': new LoginRoute(),
        'SelPatientRoute/': new SelPatientRoute(),
        'posts/': new PostsRoute(),
        'posts/:id/': new PostRoute()
    }
});
