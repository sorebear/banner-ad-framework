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
		const subFolders = ['html', 'scss', 'js', 'img'];
		subFolders.forEach(subFolder => {
			checkThenMakeDir(`${RESOURCES_PATH}/${subFolder}`);
			checkThenMakeDir(`${RESOURCES_PATH}/${subFolder}/pages`);
		});
		let tpl = '';
		for (let bannerTitle in banners.banners) {
			let link = fs.readFileSync(`${TEMPLATE_PATH}/index.tpl`, 'utf8');
			link = link.replace(/<%banner%>/g, bannerTitle);
			tpl += link;
			const banner = banners.banners[bannerTitle];
			const dims = {
				orientation: banner.orientation,
				collapsedWidth: banner.width,
				collapsedHeight: banner.height,
				expanding: banner.expanded,
				expandEventHandler: banner.expanded ? banner.expanded.expandEventHandler : null,
				expandedWidth: banner.expanded ? banner.expanded.width : null,
				expandedHeight: banner.expanded ? banner.expanded.height : null,
				expandDirection: banner.expanded ? banner.expanded.expandDirection : null,
				static: banner.static
			}
			dims.topOffset = !dims.expanding ? 0 : 
				dims.expandDirection.includes('left') ? dims.expandedHeight - dims.collapsedHeight : 0;
			dims.leftOffset = !dims.expanding ? 0 :
				dims.expandDirection.includes('up') ? dims.expandedWidth - dims.collapsedWidth : 0;
			scaffoldHTML(bannerTitle, dims);
			scaffoldSCSS(bannerTitle, dims);
			scaffoldJS(bannerTitle, dims);
			scaffoldIMG(bannerTitle, dims);
		}
		fs.writeFileSync(`${HTML_PATH}/index.html`, tpl);
	});

	const Templater = function (filePath, banner) {
		const nameTag = '<%fileName%>';
		const widthTag = '<%width%>';
		const heightTag = '<%height%>';
		let tpl = fs.readFileSync(filePath, 'utf8');
		tpl = tpl.replace(nameTag, banner);
		tpl = tpl.replace(heightTag, banners.banners[banner].height);
		tpl = tpl.replace(widthTag, banners.banners[banner].width);
		this.get = () => {
			return tpl;
		}
	}

	const scaffoldHTML = (banner, dims) => {
		tpl = dims.expanding ? 
			new Templater(`${TEMPLATE_PATH}/htmlExpanding.tpl`, banner) :
			dims.static ?
				new Templater(`${TEMPLATE_PATH}/htmlStatic.tpl`, banner) : 
				new Templater(`${TEMPLATE_PATH}/html.tpl`, banner);
		checkThenWriteFile(
			`${HTML_PATH}/pages/${banner}.html`,
			tpl.get()
		);
	};

	const scaffoldSCSS = (banner, dims) => {
		let tpl = dims.expanding ? 
			fs.readFileSync(`${TEMPLATE_PATH}/scssExpanding.tpl`, 'utf8') :
			dims.static ? 
				fs.readFileSync(`${TEMPLATE_PATH}/scssStatic.tpl`, 'utf8') :
				fs.readFileSync(`${TEMPLATE_PATH}/scss.tpl`, 'utf8');
		tpl = tpl.replace(/<%orientation%>/g, dims.orientation);
		tpl = tpl.replace(/<%banner-title%>/g, banner);
		tpl = tpl.replace(/<%collapsedWidth%>/g, dims.collapsedWidth);
		tpl = tpl.replace(/<%collapsedHeight%>/g, dims.collapsedHeight);
		if (dims.expanding) {
			tpl = tpl.replace(/<%expandedWidth%>/g, dims.expandedWidth);
			tpl = tpl.replace(/<%expandedHeight%>/g, dims.expandedHeight);
			tpl = tpl.replace(/<%leftPosition%>/g, dims.leftOffset);
			tpl = tpl.replace(/<%topPosition%>/g, dims.topOffset);
		}
		checkThenWriteFile(`${SCSS_PATH}/pages/${banner}.scss`, tpl);
	};

	const scaffoldJS = (banner, dims) => {
		let tpl = dims.expanding ? 
			fs.readFileSync(`${TEMPLATE_PATH}/jsExpanding.tpl`, 'utf8') : 
			dims.static ?
				fs.readFileSync(`${TEMPLATE_PATH}/jsStatic.tpl`, 'utf8') :
				fs.readFileSync(`${TEMPLATE_PATH}/js.tpl`, 'utf8');
		let exitLinks = '';
		for (link in banners.links) {
			let exitLink = fs.readFileSync(`${TEMPLATE_PATH}/exitLink.tpl`, 'utf8');
			exitLink = exitLink.replace(/<%exit%>/g, link);
			exitLink = exitLink.replace(/<%exitFormatted%>/g, banners.links[link].displayName);
			exitLinks += exitLink;
		}
		tpl = tpl.replace(/<%exitLinks%>/g, exitLinks);
		tpl = tpl.replace(/<%leftOffset%>/g, dims.leftOffset);
		tpl = tpl.replace(/<%topOffset%>/g, dims.topOffset);
		tpl = tpl.replace(/<%expandedWidth%>/g, dims.expandedWidth);
		tpl = tpl.replace(/<%expandedHeight%>/g, dims.expandedHeight);
		const expandEventHandler = dims.expandEventHandler === 'click' ?
			fs.readFileSync(`${TEMPLATE_PATH}/expandingClickHandler.tpl`, 'utf8') :
			dims.expandEventHandler === 'hover' ?
				fs.readFileSync(`${TEMPLATE_PATH}/expandingHoverHandler.tpl`, 'utf8') :
				''
		tpl = tpl.replace(/<%expandEventHandler%>/g, expandEventHandler);
		fs.writeFileSync(`${JS_PATH}/pages/${banner}.js`, tpl);
	}

	const scaffoldIMG = banner => {
		checkThenMakeDir(`${IMG_PATH}/pages/${banner}`);
	};

	// Helper Functions
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

	// Clean Scaffold
	gulp.task('scaffold:clean', () => {
		return del.sync([
			`${RESOURCES_PATH}/html/pages`,
			`${RESOURCES_PATH}/scss/pages`,
			`${RESOURCES_PATH}/js/pages`,
			`${RESOURCES_PATH}/img/pages`
		]);
	});

	// Re-Scaffold Task
	gulp.task('re-scaffold', ['scaffold:clean', 'scaffold']);
};
