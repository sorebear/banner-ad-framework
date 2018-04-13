const autoPrefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const fs = require('fs');

// File Paths to Watch
const SCSS_PATH = 'resources/scss';

module.exports = (gulp, banners) => {

	// Sass Styles Shared
	gulp.task('styles-shared', () => {
		Object.keys(banners).forEach(banner => {
			fs.readFile(`${SCSS_PATH}/pages/${banner}.scss`, 'utf-8', (err, data) => {
				if (err) throw err;
				if (data) {
					return gulp
                  .src(`${SCSS_PATH}/pages/${banner}.scss`)
						.pipe(sourcemaps.init())
						.pipe(autoPrefixer())
						.pipe(
							sass({
								outputStyle: 'compressed'
							})
						)
						.pipe(sourcemaps.write())
						.pipe(gulp.dest('dist/shared-assets/css'));
				}
			});
		});
		return gulp
			.src([
            `${SCSS_PATH}/vertical.scss`,
            `${SCSS_PATH}/horizontal.scss`
         ])
         .pipe(
            plumber(err => {
               console.log("Styles Task Error: ", err);
               this.emit("end");
            })
         )
			.pipe(sourcemaps.init())
			.pipe(autoPrefixer())
			.pipe(
				sass({
					outputStyle: 'compressed'
				})
			)
			.pipe(sourcemaps.write())
			.pipe(gulp.dest('dist/shared-assets/css'));
   });
   
   // Sass Styles separated
	gulp.task('styles-separated', () => {
		return Object.keys(banners).forEach(banner => {
			const { orientation } = banners[banner]; 
			return gulp
				.src(`${SCSS_PATH}/pages/${banner}.scss`)
				.pipe(
					sass({
						outputStyle: 'compressed'
					})
				)
				.pipe(autoPrefixer())
				.pipe(concat(`${orientation}.css`))
				.pipe(gulp.dest(`dist/separated-assets/${banner}/css`));
		});
   });

   // Watch Sass Files For Changes
	gulp.task('watchStyles', () => {
		gulp.start('styles-shared');
		gulp.watch([
			`${SCSS_PATH}/**/*.scss`,
			`${SCSS_PATH}/*.scss`,
      ],
      ['styles-shared']);
	});

	// Watch Sass Files For Changes
	gulp.task('watchSeparatedStyles', () => {
	gulp.start('styles-separated');
	gulp.watch([
		`${SCSS_PATH}/**/*.scss`,
		`${SCSS_PATH}/*.scss`,
		],
		['styles-separated']);
	});
};
