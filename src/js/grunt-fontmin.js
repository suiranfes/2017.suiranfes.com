
let chalk = require('chalk')
let grunt = require('grunt')
let TTF   = require('node-sfnt')
let ttf2woff = TTF.ttf2woff
var ttf2woff2 = require('ttf2woff2');

let html2text = require('html-to-text')
let basename = require('path').basename
let extname  = require('path').extname
let join = require('path').join


// grunt task function
function taskFontmin() {
    // prase options
    let opts    = this.options()
    let data    = this.data
    let destdir = opts.dest    || './'
    let basedir = opts.basedir || './'
    let src     = grunt.file.expand(data.src)
    let fonts   = grunt.file.expand(join(basedir, this.target))
    let getText = opts.getText!==undefined ? opts.getText : (content)=>html2text.fromString(content)
    let types=['woff','woff2','ttf'], typeOpts=true

    // string of unique characters(glyphs) to be included in minimized font
    let uniqGlyphs =
        src.map( path => grunt.file.read(path) )
           .map( getText )
           .join()
           .split('')
           .sort().reduce( nodup(), [] )   // remove duplicate characters
           .join('')


    fonts.forEach( path => {
        // create output ArrayBuffer
        let ttf = readToTTF(path)
        let stripped = glyphStrip(ttf, uniqGlyphs)
        for( var i in types ){
            var type = types[i]
            let output = ttfToOutput(stripped, type, typeOpts)
    
            // solve dest path, write output
            let destPath = join(destdir, getOutputFilename(path,type))
            grunt.file.write(destPath, toBuffer(output))
        }
        // output information
        grunt.log.writeln(basename(path)+' => '+type+' '
            +chalk.green(stripped.glyf.length)+' glyphs, '
            +chalk.green(output.byteLength)+' bytes')
    } )

}

// sourcePath: sourceFile's path
// type: 'woff' or 'css'
function getOutputFilename(sourcePath, type) {
    return stripFilename(basename(sourcePath))+'.'+type
}

// ttf:    ttf
// output: output type, one of 'woff', 'css', default 'woff'
// opts:   output type specific option
// return  ArrayBuffer
// currently only woff is supported, TODO: impl css
function ttfToOutput(ttf, type, opts) {
    let ttfAb = new TTF.TTFWriter().write(ttf)
    switch(type){
        case 'ttf': return ttfAb
        case 'woff': return ttf2woff(ttfAb, {deflate: require('pako').deflate})
        case 'woff2': return ttf2woff2(ttfAb, {deflate: require('pako').deflate})
    }
}

// ttf:    ttf
// glyphs: glyph string
// modify  ttf in place! return ttf
function glyphStrip(ttf, glyphs) {
    // reference git: be5invis/node-sfnt/lib/ttf/ttf.js
    function getStringGlyfs(ttf, str) {
        let glyphs = [];
        let indexList = ttf.findGlyf({ unicode: str.split('').map(toCharCode) })
        if (indexList.length) glyphs = ttf.getGlyf(indexList);
        glyphs.unshift(ttf.get().glyf[0]);
        return glyphs;
    }
    let ttfObj = new TTF.TTF(ttf)
    ttfObj.setGlyf(getStringGlyfs(ttfObj, glyphs))
    return ttfObj.get()
}

// read path to TTF (Not TTFObject with methods!!)
// perform conversion if needed
function readToTTF(path) {
    let otf2ttfObj = TTF.otf2ttfobject
    let ttfReader  = TTF.TTFReader
    let woff2ttf   = TTF.woff2ttf
    let ext = extname(path).toLowerCase()
    let content = grunt.file.read(path, {encoding: null})
    let ab = toArrayBuffer(content)
    switch(ext){
        case '.otf':
            return otf2ttfObj(ab)
        break
        case '.ttf':
        case '.ttc':
            return new ttfReader().read(ab)
        break
        case '.woff':
        case '.woff2':
            return ttfReader(woff2ttf(ab))
        break
        default:
            throw new Error('Unsupported extension: '+ext)
        break
    }
}

// remove consecutive duplicate elements
// eq is comparator, if not provided, use ===
// arr.sort().reduce( nodup(eq), [] )
function nodup(eq) {
    let last
    if (arguments.length===0)
        eq = (a,b)=>a===b
    return function(v, cur){
        if ( !eq(last, cur) )
            v.push(cur)
        last=cur
        return v
    }
}

function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

function toBuffer(ab) {
    var buffer = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i];
    }
    return buffer;
}

function toChar(unicode_code) {
    return String.fromCharCode(unicode_code)
}

function toCharCode(char) {
    return char.charCodeAt(0)
}

function stripFilename(path) {
    var name = basename(path)
    return name.substr(0, name.length - extname(name).length)
}

function atMostDefined(obj, num, _keys){
    let keys  = Array.prototype.slice.call(arguments, 1)
    let count = 0
    for (let key of keys)
        if (obj[key]!==undefined) ++count
    return count<=num
}
