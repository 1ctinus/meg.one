const path = require('path');
const fs = require('fs-extra');
const pino = require('pino')({
	prettyPrint: process.env.NODE_ENV === 'production' ? false : true
});

module.exports = {
	log: pino,
	CONFIG: {
		port: 8236,
		icon: joinPath('../client/static/favicon.ico'),
		static: joinPath('../client/static'),
		uploads: joinPath('../client/uploads'),
		images: joinPath('../client/images'),
		fonts: joinPath('../client/static/fonts'),
		views: joinPath('../client/views/pages')
	},
	sass: {
		file: joinPath('../client/sass/main.scss'),
		outputStyle: 'compressed'
	},
	http: {
		_404: '<title>404 - Page not found</title><center><br><br><h1>404 - Page not found</h1></center>',
		_500: '<title>500 - Internal server error</title><center><br><br><h1>500 - Internal server error</h1></center>'
	},
	path: joinPath,
	getData: getData
};

function joinPath(file) {
	return path.join(__dirname, file);
}

function getData(page) {
	return new Promise((resolve, reject) => {
		let filepath = joinPath(page ? `../data/${page}.json` : '../data/main.json');
		fs.pathExists(filepath)
			.then((exists) => exists ? fs.readJson(filepath) : resolve())
			.then((json) => resolve(json))
			.catch((err) => reject(err));
	});
}
