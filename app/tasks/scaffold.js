/**
* 
* SETUP FOR A NEW PROJECT
*
* Scaffold builds sass, html, and images for new projects.
*
* For new projects:
*
* First fill out './banners.json' with all the different banners for your
* project
* Afterwards run `gulp scaffold:clean` to delete example banners. Then run
* `gulp scaffold` to create sass and html pages from './banners.json'.
* You can also run `gulp re-scaffold` to both clean and create in one command
*
* The preloaded sizes are based on DoubleClicks 'Top-performing ad sizes'
* Other supported ad sizes include: 125x125, 180x150, 200x200, 200x446, 220x90, 234x60, 240x133, 250x250
* 300x31, 300x50, 300x100, 300x600, 300x1050, 320x50, 320x100, 468x60, 960x90, 970x90, 970x250
* The support page for this information can be found here: https://support.google.com/adxbuyer/answer/3011898?hl=en
*
* The HTML file that are given to banners upon scaffolding can be customized
* by editng html/templates/layout.html
*/

const del = require('del');
const fs = require('fs');
const RESOURCES_PATH = 'resources';
const TEMPLATE_PATH = 'app/templates'
const HTML_PATH = 'resources/html/';
const JS_PATH = 'resources/js/';
const SCSS_PATH = 'resources/scss/';
const IMG_PATH = 'resources/img/';

module.exports = (gulp, banners) => {
	gulp.task('scaffold', () => {
		checkThenMakeDir(RESOURCES_PATH);
		const subFolders = ['html', 'scss', 'img'];
		subFolders.forEach(subFolder => {
			checkThenMakeDir(`${RESOURCES_PATH}/${subFolder}`);
			checkThenMakeDir(`${RESOURCES_PATH}/${subFolder}/pages`);
		});
		let tpl = '';
		for (let banner in banners) {
			let link = fs.readFileSync(`${TEMPLATE_PATH}/index.tpl`, 'utf8');
			link = link.replace(/<%banner%>/g, banner);
			tpl += link;
			scaffoldHTML(banner);
			scaffoldSCSS(banner);
			scaffoldIMG(banner);
		}
		fs.writeFileSync(`${HTML_PATH}/index.html`, tpl);
	});

	const checkThenMakeDir = path => {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
	};

	const checkThenWriteFile = (path, content) => {
		if (!fs.existsSync(path)) {
			fs.writeFileSync(path, content);
		}
	};

	// Scaffold SCSS
	const scaffoldSCSS = banner => {
		let tpl = fs.readFileSync(`${TEMPLATE_PATH}/scss.tpl`, 'utf8');
		tpl = tpl.replace('<%orientation%>', banners[banner]['orientation']);
		tpl = tpl.replace('<%banner-title%>', banner);
		checkThenWriteFile(`${SCSS_PATH}/pages/${banner}.scss`, tpl);
	};

	const Templater = function (filePath, banner) {
		const nameTag = '<%fileName%>';
		const widthTag = '<%width%>';
		const heightTag = '<%height%>';
		let tpl = fs.readFileSync(filePath, 'utf8');
		tpl = tpl.replace(nameTag, banner);
		tpl = tpl.replace(heightTag, banners[banner]['height']);
		tpl = tpl.replace(widthTag, banners[banner]['width']);
		this.get = () => {
			return tpl;
		}
	}

	// Scaffold HTML
	const scaffoldHTML = banner => {
		template = banner.includes('static') ? 
			new Templater(`${TEMPLATE_PATH}/htmlStatic.tpl`, banner) : 
			new Templater(`${TEMPLATE_PATH}/html.tpl`, banner);
		checkThenWriteFile(
			`${HTML_PATH}/pages/${banner}.html`,
			template.get()
		);
	};

	// Scaffold IMG
	const scaffoldIMG = banner => {
		checkThenMakeDir(`${IMG_PATH}/pages/${banner}`);
	};

	// Clean Scaffold
	gulp.task('scaffold:clean', () => {
		return del.sync([
			`${RESOURCES_PATH}/html/pages`,
			`${RESOURCES_PATH}/scss/pages`,
			`${RESOURCES_PATH}/img/pages`
		]);
	});

	// Re-Scaffold Task
	gulp.task('re-scaffold', ['scaffold:clean', 'scaffold']);
};
