const fs = require('fs');
const prompt = require('gulp-prompt');
const beautify = require('js-beautify');

const HTML_PATH = 'resources/html/pages';
const SCSS_PATH = 'resources/scss/pages';
const JS_PATH = 'resources/js/pages';
const IMG_PATH = 'resources/img/pages';

module.exports = (gulp, banners) => {
	gulp.task('rename', () => {
		const checkThenRename = (currentPath, newPath) => {
			if (fs.existsSync(currentPath)) {
				fs.rename(currentPath, newPath);
			}
		};

		const renameBanners = (currentBannerName, newBannerName) => {
			checkThenRename(`${HTML_PATH}/${currentBannerName}.html`, `${HTML_PATH}/${newBannerName}.html`);
			checkThenRename(`${SCSS_PATH}/${currentBannerName}.scss`, `${SCSS_PATH}/${newBannerName}.scss`);
			checkThenRename(`${JS_PATH}/${currentBannerName}.js`, `${JS_PATH}/${newBannerName}.js`);
			checkThenRename(`${IMG_PATH}/${currentBannerName}`, `${IMG_PATH}/${newBannerName}`);
			const bannerJson = JSON.stringify(banners).replace(currentBannerName, newBannerName);
			fs.writeFileSync('banners.json', beautify(bannerJson, { indent_size: 2 }), 'utf8');
			console.log(`RENAME COMPLETE: "${currentBannerName}" WAS RENAMED TO "${newBannerName}"`);
		}

		const bannerArr = Object.keys(banners.banners);
		const bannerString = `CHOOSE BANNER TO RENAME:\n${bannerArr.map((banner, index) => `[${index + 1}] ${banner}\n`).join('')}`;

		gulp.src('./gulpfile.babel.js')
			.pipe(prompt.prompt({
				type: 'input',
				name: 'currentBannerIndex',
				message: bannerString,
				choices: bannerArr.map((banner, index) => index + 1 + ''),
			}, currentBanner => {
				const currentName = bannerArr[parseInt(currentBanner.currentBannerIndex) - 1];
				return gulp.src('./gulpfile.babel.js')
					.pipe(prompt.prompt({
						type: 'input',
						name: 'newName',
						message: `BANNER SELECTED: "${currentName}"\nCHOOSE A NEW NAME: `
					}, newBanner => renameBanners(currentName, newBanner.newName)));
			}));
	});
};
