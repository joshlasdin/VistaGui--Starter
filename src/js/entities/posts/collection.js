const bb = require('backbone');
const PostModel = require('./model');

module.exports = bb.Collection.extend({
    url: `https://jsonplaceholder.typicode.com/posts`,
    model: PostModel,
});
