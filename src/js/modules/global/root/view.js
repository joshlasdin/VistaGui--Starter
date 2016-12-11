const mn = require('backbone.marionette');
const Radio = require('backbone.radio');
const HeaderView = require('../header/view');

module.exports = mn.View.extend({
    initialize() {
        this._channel = Radio.channel('root');
    },

    template: require('./template.hbs'),

    regions: {
        header: { el: '.r-header', replaceElement: true },
        body: '.r-body',
    },

    onRender() {
        this.showChildView('header', new HeaderView());
    },

    onAttach() {
        this._channel.reply({
            body: view => this.showChildView('body', view),
        }, this);
    },

    onBeforeDestroy() {
        this._channel.stopReplying('body');
    },
});
