'use strict';

const $ = require('jquery');
const _ = require('lodash');
const bb = require('backbone');

// Lodash shims for Backbone.Blazer
_.pluck = _.map;

// Expose globals
global.$ = global.jQuery = $;
global._ = _;
global.Backbone = bb;

// Import Backbone plugins
require('backbone.marionette');
require('backbone.intercept');
require('backbone.blazer');

// Import Bootstrap scripts
require("bootstrap/dist/js/bootstrap");

// Start up the application
const App = require('./app');
const app = new App();
app.start();
