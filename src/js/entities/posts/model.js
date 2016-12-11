const bb = require('backbone');

module.exports = bb.Model.extend({
    urlRoot: `https://jsonplaceholder.typicode.com/posts`,
});
