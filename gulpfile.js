const path = require('path');
const gulp = require('gulp');
const pug = require('gulp-pug');
const data = require('gulp-data');
const plumber = require('gulp-plumber');
const assets = require('./assets.json');

gulp.task('template', () => {
	const pugPath = path.join('src/pages', '/**/index.pug');
	gulp.src(pugPath)
		.pipe(plumber())
		.pipe(data(file => {
			const name = path.dirname(path.relative(file.base, file.path));
			js = assets[name].js;
			const pugData = {
				common: assets.common.js,
				href: name,
				js: js
			}
			console.log(pugData);
			return pugData
		}))
		.pipe(pug())
		.pipe(gulp.dest('template'));
});

gulp.task("watch", ['template'], () => {
	gulp.watch('src/pages/**/*.pug', ["template"]);
});