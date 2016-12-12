"use strict";

const $ = require("../../config.js");

$.gulp.task("dev", ["pages", "scripts", "styles", "connect", "watch"]);

$.gulp.task("watch", () => {
	$.gulp.watch("./src/*.html", ["pages"]);
	$.gulp.watch("./src/styles/**/*", ["styles"]);
});

$.gulp.task("connect", () => {
	$.connect.server({
		root: $.config.dest,
		livereload: true,
		middleware: function(connect, opt) {
			return [
				$.pushstate()
			];
		},
	});
});



/********************************************************************************/
$.gulp.task(
	"pages", 
	"",
	[],
	function() { 
		console.log("------------------");
		console.log($.config.dest);
		console.log("------------------");
		
		$.gulp.src("./src/*.html")
			.pipe($.gulp.dest($.config.dest))
			.pipe($.connect.reload());
	}
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
	// let bs = browserSync.get("Server");
	let combined = $.combiner.obj([
		$.gulp.src(sFontFiles),
		$.changed(dFontFiles),
		$.gulp.dest(dFontFiles)
	]);
	$.combined.on("error", console.error.bind(console));
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



$.gulp.task("scripts", () => {
	let bundler = $.browserify({
		entries: "./src/js/index.js",
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

	if ($.args.watch) { bundler.on("update", () => rebundle()); }
	rebundle();
});
