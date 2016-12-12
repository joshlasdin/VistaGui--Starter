"use strict";
require("dotenv").config();

const utils        = require("./utils.js");
const aliasify     = require("aliasify");
const autoprefixer = require("autoprefixer");
const babelify     = require("babelify");
const browserSync  = require("browser-sync");
const browserify   = require("browserify");
const chai         = require("chai");
const pushstate    = require("connect-pushstate");
const del          = require("del");
const fs           = require("fs-extra");
const changed      = require("gulp-changed");
const connect      = require("gulp-connect");
const eslint       = require("gulp-eslint");
const size         = require("gulp-filesize");
const gulp         = require("gulp-help")(require("gulp"));
const imagemin     = require("gulp-imagemin");
const less         = require("gulp-less");
const minifyCSS    = require("gulp-minify-css");
const mocha        = require("gulp-mocha");
const notify       = require("gulp-notify");
const postcss      = require("gulp-postcss");
const sourcemaps   = require("gulp-sourcemaps");
const uglify       = require("gulp-uglify");
const gutil        = require("gulp-util");
const hbsfy        = require("hbsfy");
const _            = require("lodash");
const prettyHrtime = require("pretty-hrtime");
const proxy        = require("proxy-middleware");
const combiner     = require("stream-combiner2");		// see -> https://github.com/gulpjs/gulp/blob/master/docs/recipes/combining-streams-to-handle-errors.md
const url          = require("url");
const buffer       = require("vinyl-buffer");
const source       = require("vinyl-source-stream");
const watchify     = require("watchify");
const args         = require("yargs").argv;
const argv         = require("yargs").argv;


const src          = "./src";
const srcApp       = src + "/js/app.js";
const srcFile      = "app.js";

const nodeModules  = "./node_modules";
const dest         = "./build";
const outputName   = "index.js";
const Staging      = "./htdocs";


const config = {
	apiRoot: "http://74.102.74.34:7000",
	src: src,
	srcApp: srcApp,
	srcFile: srcFile,
	dest: dest,
	Staging: Staging,

	deploy: {
		src: dest + "/**/*",
		dev: {},
		staging: {},
		production: {}
	}
};

module.exports = {
	console: console,
	config : config,
	nodeModules: nodeModules, 
	_ : _,
	aliasify: aliasify,
	args: args,
	argv: argv,
	autoprefixer: autoprefixer,
	babelify: babelify,
	browserSync: browserSync,
	browserify: browserify,
	buffer: buffer,
	chai: chai,
	changed: changed,
	combiner: combiner,
	connect: connect,
	del: del,
	eslint: eslint,
	fs: fs,
	gulp: gulp,
	gutil: gutil,
	hbsfy: hbsfy,
	imagemin: imagemin,
	less: less,
	minifyCSS: minifyCSS,
	mocha: mocha,
	notify: notify,
	postcss: postcss,
	prettyHrtime: prettyHrtime,
	proxy: proxy,
	pushstate: pushstate,
	size: size,
	source: source,
	sourcemaps: sourcemaps,
	uglify: uglify,
	url: url,
	utils: utils,
	watchify: watchify
};