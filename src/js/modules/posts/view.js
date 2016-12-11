const mn = require('backbone.marionette');
const PostListView = require('./list/view');

module.exports = mn.View.extend({
    template: require('./template.hbs'),

    regions: {
        list: { el: '.r-post-list', replaceElement: true },
    },

    onRender() {
        this.showChildView('list', new PostListView({
            collection: this.collection,
        }));
    },
});
