var path = require('path'),
	express = require('express');

/**
 * Adds bindings for keystone static resources
 * Can be included before other middleware (e.g. session management, logging, etc) for
 * reduced overhead
 *
 * @param {Express()} app
 * @api public
 */

function static(app) {
	
	app.use('/keystoneplus', require('less-middleware')(__dirname + path.sep + 'public'));
	app.use('/keystoneplus', express.static(__dirname + path.sep + 'public'));
	
	return this;
	
}

module.exports = static;
