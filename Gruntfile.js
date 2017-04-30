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
    'everything': ['docs/**/*.html','docs/assets/**/*.css','docs/assets/**/*.js','docs/api/**/*.json']
}


module.exports = function(grunt){
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
                files: listPages()
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

function listPages() {
    var siteArray = grunt.file.readJSON('config/site.json'),
        fesArray = grunt.file.readJSON('config/fes.json'),
        files = '{',
        sitemaptxt = '{',
        logtext = 'Listing Up Files\n\n';

    for (var i in siteArray.site.pages) {
        files += '"docs/' + siteArray.site.pages[i].id + '.html":"src/pug/' + siteArray.site.pages[i].id + '.pug"';
        logtext += '' + siteArray.site.pages[i].id + '\n';
        files += ',\n';
    }
    files = files.substr( 0, files.length - 2 );
    files += '}';
    console.log(logtext);
    return JSON.parse(files);
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
        commit = grunt.file.read('./.git/ORIG_HEAD'),
        urlstr = grunt.file.read('./src/text/urls.txt'),
        urls = urlstr.split("\n");
    for(var i in urls) {
        if(urls[i] != "") myreturn += '    "' + urls[i].replace(/\s|\n/g, "") + '",\n';
    }
    myreturn.substr( 0, myreturn.length - 2 );
    myreturn += "\n];\nvar version = '" + commit.replace(/\s|\n/g, "") + "';\n" + sw;
    return myreturn;
}
  //タスクの登録
    grunt.registerTask('default', ['clean', 'merge-json', 'rss', 'sw', 'browserify', 'uglify', 'stylus', 'cssmin', 'pug']);
    grunt.registerTask('server', ['default', 'connect', 'watch']);

}