var fs = require("fs");
var marked = require('marked');
var UglifyJS = require('uglify-js');
var pugfilters = module.exports = {};

pugfilters.md = function(str) {
    return marked(str);
};
pugfilters.markdown = function(str) {
    return marked(str);
};
pugfilters.marked = function(str) {
    return marked(str);
};
pugfilters.UglifyJS = function(str) {
    var result = UglifyJS.minify(str, {fromString: true}).code;
    return result;
};