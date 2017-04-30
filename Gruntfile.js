
var package = require('./package.json');

let chalk = require('chalk')
let grunt = require('grunt')
let TTF   = require('node-sfnt')
let ttf2woff = TTF.ttf2woff
let ttf2woff2 = require('ttf2woff2');

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
            // output information
            grunt.log.writeln(basename(path)+' => '+type+' '
                +chalk.green(stripped.glyf.length)+' glyphs, '
                +chalk.green(output.byteLength)+' bytes')
        }
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
        case 'woff2': return ttf2woff2(toBuffer(ttfAb), {deflate: require('pako').deflate})
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

var src = {
   'pug': ['src/pug/**/*.pug', '!' + 'src/pug/**/_*.pug'],
   'everypug': 'src/pug/**/*.pug',
   'json': 'config/**/*.json',
   'js': 'src/js/**/*.js',
   'styl': ['src/styl/**/*.styl', '!' + 'src/styl/**/_*.styl'],
   'everystyl': 'src/styl/**/*.styl'
};

var dest = {
    'root': 'docs/',
    'everything': ['docs/**/*.html','docs/assets/**/*.css','docs/assets/**/*.js','docs/api/**/*.json','docs/assets/fonts/**/*.woff','docs/assets/fonts/**/*.woff2','docs/assets/fonts/**/*.ttf','docs/assets/fonts/**/*.eot','docs/assets/fonts/**/*.svg','docs/assets/fonts/**/*.ttf']
}

module.exports = function(grunt){
    grunt.registerMultiTask('fontmin', 'Minimize fonts', taskFontmin)

    grunt.initConfig({
        clean: {
            build: {
                src: dest.everything
            }
        },
        pug: {
            compile: {
                options: {
                    data: function(dest, src) {
                        return grunt.file.readJSON('./docs/api/v1/index.json');
                    },
                    filters: require('./pugfilters.js'),
                    debug: false
                },
                files: listPages("pug")
            }
        },
        stylus: {
            compile: {
                options: {
                    import: [
                        'nib'
                    ],
                    "include css": true
                },
                files: {
                    'docs/assets/style.css' : ['src/styl/*.styl', '!' + 'src/styl/_*.styl']
                }
            }
        },
        cssmin: {
            minifybs: {
                files: {
                    'docs/assets/style.min.css': 'docs/assets/style.css'
                }
            }
        },
        browserify: {
            bundle: {
                files: {
                    'docs/assets/main.js' : 'src/js/main.js'
                }
            }
        },
        uglify: {
            compress: {
                options: {
                    compress: {
                        sequences     : true,  // join consecutive statemets with the “comma operator”
                        properties    : true,  // optimize property access: a["foo"] → a.foo
                        dead_code     : true,  // discard unreachable code
                        drop_debugger : true,  // discard “debugger” statements
                        unsafe        : false, // some unsafe optimizations (see below)
                        conditionals  : true,  // optimize if-s and conditional expressions
                        comparisons   : true,  // optimize comparisons
                        evaluate      : true,  // evaluate constant expressions
                        booleans      : true,  // optimize boolean expressions
                        loops         : true,  // optimize loops
                        unused        : true,  // drop unused variables/functions
                        hoist_funs    : true,  // hoist function declarations
                        hoist_vars    : false, // hoist variable declarations
                        if_return     : true,  // optimize if-s followed by return/continue
                        join_vars     : true,  // join var declarations
                        cascade       : true,  // try to cascade `right` into `left` in sequences
                        side_effects  : true,  // drop side-effect-free statements
                        warnings      : false,  // warn about potentially dangerous optimizations/code
                    }
                },
                files: {
                    'docs/assets/main.min.js' : 'docs/assets/main.js'
                }
            }
        },
        watch: {
            files: [src.everypug, src.json, src.everystyl, src.js,'Gruntfile.js'],
            tasks: ['default']
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    hostname: '*',
                    base: 'docs'
                }
            }
        },
        fontmin: {
            options: {
                dest: 'docs/assets/fonts/',
                basedir: 'src/fonts/'
            },
            '**/*.ttf':{
                getText: "getBody",
                src: "docs/*.html",
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

function arrayMerge() {
    if (arguments.length === 0) return false;
    var i, len, key, result = new Object();
    for (i = 0, len = arguments.length;i < len; i++) {
        if (typeof arguments[i] !== 'object') continue;
        for (key in arguments[i]) {
            if (isFinite(key)) {
                result.push(arguments[i][key]);
            } else {
                result[key] = arguments[i][key];
            }
        }
    }
    return result;
};

grunt.task.registerTask( 'merge-json' , 'Merge all config files' , function(){
    var resultObj = { options: "" };
    grunt.file.recurse('./config/', process );
    function process(abspath, rootdir, subdir, filename){
        console.log(filename);
        if( filename.indexOf('.json') > -1 ){
            bookObj = grunt.file.readJSON('./'+abspath);
            for (var key in bookObj) {
                resultObj = arrayMerge( resultObj , bookObj );
            }
        }
    }
    grunt.file.write( 'docs/api/v1/index.json' , JSON.stringify( resultObj ) );
});

grunt.task.registerTask( 'rss' , 'Make RSS' , function(){
    grunt.file.write( 'docs/rss2.xml' , drawrss() );
});
grunt.task.registerTask( 'sw' , 'Make sw.js' , function(){
    grunt.file.write( 'docs/sw.js' , drawsw() );
});

function listPages(mode) {
    var siteArray = grunt.file.readJSON('config/site.json'),
        fesArray = grunt.file.readJSON('config/fes.json'),
        files = '{',
        text = ''
        sitemaptxt = '{',
        logtext = 'Listing Up Files\n\n';
    for (var i in siteArray.site.pages) {
        files += '"docs/' + siteArray.site.pages[i].id + '.html" : "src/pug/' + siteArray.site.pages[i].id + '.pug"';
        text += 'docs/' + siteArray.site.pages[i].id + '.html,'
        logtext += '' + siteArray.site.pages[i].id + '\n';
        files += ',\n';
    }
    files = files.substr( 0, files.length - 2 );
    text = text.substr( 0, files.length - 1 );
    files += '}';
    console.log(logtext);
    if(mode == "pug") return JSON.parse(files);
    if(mode == "fontmin") return text.split(',');
}

function drawrss() {
    var rss = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel>',
        siteArray = grunt.file.readJSON('config/site.json'),
        fesArray = grunt.file.readJSON('config/fes.json'),
        now = new Date();
        nowISO = now.toISOString()
    
    rss += '<title>'+siteArray.site.title+'</title>'
        +'<description>'+siteArray.site.themeinjp+'</description>'
        +'<link>'+siteArray.site.URL+'</link>'
        +'<language>ja</language>'
        +'<pubDate>'+nowISO+'</pubDate>'
        +'<lastBuildDate>'+nowISO+'</lastBuildDate>'
        +'<webMaster>info@suiranfes.com</webMaster>'
        +'<copyright>Copyright (c) 2017 群馬県立高崎高等学校 第65回翠巒祭実行委員会</copyright>';

    for( var i in siteArray.site.updates ){
        rss += '<item>'
            +'<title>【'+siteArray.site.updatebadges[siteArray.site.updates[i].badge].title+'】 '+siteArray.site.updates[i].title+'</title>'
            +'<pubDate>'+siteArray.site.updates[i].date+'</pubDate>'
            +'<description><![CDATA[ '+siteArray.site.updates[i].description+']]></description>';
        if( siteArray.site.updates[i].link && siteArray.site.updates[i].link != "" ){
            rss += '<link>'+siteArray.site.URL+siteArray.site.updates[i].link+'</link>'
                +'<guid isPermaLink="true">'+siteArray.site.URL+siteArray.site.updates[i].link+'</guid>';
        } else {
            rss += '<link>'+siteArray.site.URL+'</link>'
                +'<guid isPermaLink="true">'+siteArray.site.URL+'</guid>';
        }
        rss += '</item>'
    }
    rss+= '</channel></rss>'
    return rss;
}

function drawsw() {
    var myreturn = "var cachepages = [\n",
        sw = grunt.file.read('./src/js/sw.js'),
        urlstr = grunt.file.read('./src/text/urls.txt'),
        urls = urlstr.split("\n");
    for(var i in urls) {
        if(urls[i] != "") myreturn += '    "' + urls[i].replace(/\s|\n/g, "") + '",\n';
    }
    myreturn.substr( 0, myreturn.length - 2 );
    myreturn += "\n];\nvar version = '" + package.version.replace(/\s|\n/g, "") + "';\n" + sw;
    return myreturn;
}
  //タスクの登録
    grunt.registerTask('default', ['clean', 'merge-json', 'rss', 'sw', 'browserify', 'uglify', 'stylus', 'cssmin', 'pug', 'webfont']);
    grunt.registerTask('webfont', ['fontmin']);
    grunt.registerTask('only_script', ['sw', 'browserify', 'uglify']);
    grunt.registerTask('only_style', ['sw', 'stylus', 'cssmin']);
    grunt.registerTask('only_pug', ['merge-json', 'sw', 'pug', 'webfont']);
    grunt.registerTask('server', ['default', 'connect', 'watch']);

}

