"use strict";

const $ = require("../../config.js");

$.gulp.task("dev", ["pages", "fonts", "images", "scripts", "styles", "connect", "watch"]);

$.gulp.task("watch", function() {
	$.gulp.watch($.config.src + "/*.html",      ["pages"]);
	$.gulp.watch($.config.src + "/styles/**/*", ["styles"]);
	$.gulp.watch($.config.src + "/fonts/*",     ["fonts"]);
	$.gulp.watch($.config.src + "/images/*",    ["images"]);
	$.gulp.watch($.config.src + "/js/**/*",     ["scripts"]);
});

$.gulp.task("connect", () => {
	$.connect.server({
		root: $.config.dest,
		port: 8081,
		livereload: true,
		middleware: function(connect, opt) {
			return [
				$.pushstate()
			];
		},
	});
});








/********************************************************************************/
const cleanTask = function (done) {
	$.del([$.config.dest + "/**"], done);
};

$.gulp.task(
	"clean", 
	"Cleans out the ${$.config.dest} folder",
	[],
	cleanTask);


/********************************************************************************/
const PagesFnc = function() {
	console.log("------------------ Reloading Pages ------------------");
	
	$.gulp.src($.config.src + "/*.html")
		.pipe($.gulp.dest($.config.dest))
		.pipe($.connect.reload());
};

$.gulp.task(
	"pages", 
	"Check and load any HTML pages into the build folder",
	[],
	PagesFnc
);

/*************************************************/
const sStyles = $.config.src + "/styles";
const sStylesFiles = sStyles + "/app.less";
const wStylesFiles = sStyles + "/**/*";
const dStylesFiles = $.config.dest;
const sStylesSettings = {
	paths: [
		sStyles + "/",
		$.nodeModules + "/"
	]
};
const stylesFnc = function() {
	console.log("------------------ Reloading Styles ------------------");
	let combined = $.combiner.obj([
		$.gulp.src(sStylesFiles),
		$.sourcemaps.init(),
		$.less(sStylesSettings),
		$.sourcemaps.write(),
		// postcss([ autoprefixer({ browsers: ["last 2 versions"] }) ]),
		$.gulp.dest(dStylesFiles)
	]);
	combined.on("error", console.error.bind(console));
	return combined;

};

$.gulp.task(
	"styles", 
	`Compiles all the LESS stylesheets from the ${sStylesFiles} folder into a single CSS stylesheet in the ${dStylesFiles} folder`,
	[],
	stylesFnc
);


/********************************************************************************/
const sFontFiles = [
	$.config.src + "/fonts/*",
	$.nodeModules + "/font-awesome/fonts/**/*" //add paths to other libraries if you add them
];
const dFontFiles = $.config.dest + "/fonts";

const FontsFnc = function() {
	console.log("------------------ Reloading Fonts ------------------");
	// let bs = browserSync.get("Server");
	let combined = $.combiner.obj([
		$.gulp.src(sFontFiles),
		$.changed(dFontFiles),
		$.gulp.dest(dFontFiles)
	]);
	combined.on("error", console.error.bind(console));
	return combined;
};

$.gulp.task(
	"fonts", 
	`Copies any fonts from the ${sFontFiles} folders to the ${dFontFiles} folder`,
	[],
	FontsFnc
);


/********************************************************************************/
const sImageFiles = $.config.src + "/images/*";
const dImageFiles = $.config.dest + "/images";

const ImageFnc = function() {
	console.log("------------------ Reloading Images ------------------");
	let combined = $.combiner.obj([
		$.gulp.src(sImageFiles),
		$.changed(dImageFiles),
		$.imagemin(),
		$.gulp.dest(dImageFiles)
	]);
	combined.on("error", console.error.bind(console));
	return combined;
};

$.gulp.task(
	"images", 
	`Copies and minimizes any images from the ${sImageFiles} folder to the ${dImageFiles} folder`,
	[],
	ImageFnc
);


/********************************************************************************/

$.gulp.task("scripts", function() {
	console.log("------------------ Bundling Script Files ------------------");

	let bundler = $.browserify({
		entries: $.config.src + "/js/index.js",
		debug: true,
		extensions: [".js", ".hbs"],
	});

	if ($.args.watch) { bundler = $.watchify(bundler); }

	bundler
		.transform($.babelify, {
			presets: ["es2015", "stage-2"],
			plugins: ["transform-runtime", "transform-es2015-destructuring", "transform-object-rest-spread"],
		})
		.transform($.aliasify, {
			alises: {
				underscore: "lodash",
			},
		})
		.transform($.hbsfy.configure({ extensions: ["hbs"] }));

	function rebundle() {
		console.log("------------------ RE-Bundling Script Files ------------------");
		$.gutil.log("Bundle started...");
		return bundler
			.bundle()
			.on("error", (err) => $.gutil.log(err.message))
			.on("end", () => $.gutil.log("Bundle complete!"))
			.pipe($.source("app.js"))
			.pipe($.buffer())
			.pipe($.sourcemaps.init({ loadMaps: true }))
			.pipe($.sourcemaps.write("./"))
			.pipe($.gulp.dest($.config.dest))
			.pipe($.connect.reload());
	}

	if ($.args.watch) { 
		bundler.on("update", rebundle); 
	}
	rebundle();
});
