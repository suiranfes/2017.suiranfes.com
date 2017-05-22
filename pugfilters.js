var fs = require("fs");
var marked = require('marked');
var kramed = require('kramed');
var UglifyJS = require('uglify-js');
var stylus = require('stylus');
var pugfilters = module.exports = {};

pugfilters.md = function(str) {
    return marked(str).replace(/\r?\n/g,"");
};
pugfilters.kd = function(str) {
    return kramed(str).replace(/\r?\n/g,"");
};
pugfilters.markdown = function(str) {
    return marked(str).replace(/\r?\n/g,"");
};
pugfilters.kramdown = function(str) {
    return kramed(str).replace(/\r?\n/g,"");
};
pugfilters.marked = function(str) {
    return marked(str).replace(/\r?\n/g,"");
};
pugfilters.kramed = function(str) {
    return kramed(str).replace(/\r?\n/g,"");
};
pugfilters.UglifyJS = function(str) {
    var result = UglifyJS.minify(str, {fromString: true}).code;
    return result;
};
pugfilters.oneline = function(str) {
    return str.replace(/\n/g,"");
}