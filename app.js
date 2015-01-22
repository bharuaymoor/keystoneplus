console.log("You are using keystoneplus! For more information please access harder to this link: https://github.com/DigitalInnovation/keystoneplus");

var keystone = require('keystone');
var KeystonePlus = function() {

};

var keystonePlus = module.exports = exports = new KeystonePlus();
keystonePlus.ObjectArray = require('./types/ObjectArray');
keystonePlus.static = require('./static');
keystonePlus.static(keystone.app);