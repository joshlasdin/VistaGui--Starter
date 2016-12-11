const bb = require('backbone');
const Radio = require('backbone.radio');
const Case1View = require('./view');
const PostsCollection = require('../../entities/posts/collection');

module.exports = bb.Blazer.Route.extend({
    prepare(routeData) {
        routeData.posts = new PostsCollection();
        return routeData.posts.fetch();
    },

    execute(routeData) {
        console.log('doin it');
        Radio.request('root', 'body', new Case1View({
            collection: routeData.posts,
        }));
    },
});
