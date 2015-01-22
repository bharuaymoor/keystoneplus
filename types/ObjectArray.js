/*!
 * Module dependencies.
 */

var keystone = require('keystone'),
    util = require('util'),
    utils = require('keystone-utils'),
    super_ = keystone.Field;


/**
 * TextArray FieldType Constructor
 * @extends Field
 * @api public
 */
function ObjectArray(list, path, options) {
    this._nativeType = [String];
    this._underscoreMethods = ['format'];
    options.templates = {
        form: __dirname + '/templates/' + this.constructor.name + '/' + 'form.jade',
        initial: __dirname + '/templates/' + this.constructor.name + '/' + 'initial.jade'
    };
    ObjectArray.super_.call(this, list, path, options);
}

/*!
 * Inherit from Field
 */
util.inherits(ObjectArray, super_);

ObjectArray.prototype.validateInput = function(data) {
    // TODO - how should image field input be validated?
    return true;
};

ObjectArray.prototype.addToSchema = function() { // this function is nessary!!!!!
    var field = this,
        schema = this.list.schema;
    var mongoose = keystone.mongoose;
};

/**
 * Updates the value for this field in the item from a data object
 *
 * @api public
 */
ObjectArray.prototype.updateItem = function(item, data) {
    var o = this.options.subObjectDefine;
    var bigpath = this.path;
	var newArryvalue = [];
    for(var i =1;i<2000;i++){
    	var newValue = null;
	    Object.keys(o).forEach(function(key) {
	        var val = o[key];
	        if(key != "type"){
	        	var tempkey = bigpath + "." + key + "." + i;
	        	if(data[tempkey] != undefined){
		        	var realdetailvalue = data[tempkey];
		    		if(newValue == null){
						newValue = {};
		    		}
		    		newValue[key] = realdetailvalue;
	        	}
	        }
	    });
	    if(newValue != null){
			newArryvalue.push(newValue);
		}
    }
	item.set(this.path,newArryvalue);
};
/*!
 * Export class
 */
exports = module.exports = ObjectArray;






















