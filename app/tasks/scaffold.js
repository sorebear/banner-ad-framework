/**
* 
* SETUP FOR A NEW PROJECT
*
* Scaffold builds sass, html, and images for new projects.
*
* For new projects:
*
* First fill out ./banners.json with all the different banners for your
* project
* Afterwards run `gulp scaffold:clean` to delete example banners. Then run
* `gulp scaffold` to create sass and html pages.
* You can also run `gulp re-scaffold` to both clean and create in one command
*
* To update an existing project:
*
* If new banners need to be added to an existing project, first add the
* banner info to banners.json, then run `gulp scaffold`. It wont overwrite
* old banner pages.
* To delete a keymessage remove it from keymessage.json and run 

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
		for (let i = 0; i < subFolders.length; i++) {
			checkThenMakeDir(`${RESOURCES_PATH}/${subFolders[i]}`);
			checkThenMakeDir(`${RESOURCES_PATH}/${subFolders[i]}/pages`);
		}
		for (let banner in banners) {
			scaffoldHTML(banner);
			scaffoldSCSS(banner);
			scaffoldIMG(banner);
		}
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
		checkThenWriteFile(`${SCSS_PATH}/pages/${banner}.scss`, '');
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
		template = new Templater(`${TEMPLATE_PATH}/htmlPage.tpl`, banner);
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
	gulp.task('re-scaffold', ['scaffold:clean', 'scaffold'], () => {
		console.log('Rebuilding Resources');
	});
};
