var pugfilters = module.exports = {};
pugfilters.md = function(str) {
    var marked = require('marked');
    return marked(str);
};
pugfilters.markdown = function(str) {
    var marked = require('marked');
    return marked(str);
};
pugfilters.marked = function(str) {
    var marked = require('marked');
    return marked(str);
};