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
    'everything': ['docs/**/*.html','docs/**/*.css','docs/**/*.js','docs/api/**/*.json']
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
                    ]
                },
                files: {
                    'docs/css/style.css' : ['src/styl/*.styl', '!' + 'src/styl/_*.styl']
                }
            }
        },
        concat: {
            bundle: {
                files: {
                    'cache/main.js' : [
                        'src/js/jquery.js',
                        'src/js/tether.js',
                        'src/js/bootstrap.js',
                        'src/js/blockoldandro.js',
                        'src/js/loading.js',
                        'src/js/suiranfes-updates.js',
                        'src/js/snses.js'
                    ]
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
                    'docs/js/main.js' : 'cache/main.js'
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

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

function listPages() {
    var siteArray = grunt.file.readJSON('config/site.json'),
        files = '{',
        logtext = 'Files:\n';
    for (var i in siteArray.site.pages) {
        files += '"docs/' + siteArray.site.pages[i].name + '.html":["src/pug/' + siteArray.site.pages[i].name + '.pug"]';
        logtext += '' + siteArray.site.pages[i].name + '\n';
        if ( i < siteArray.site.pages.length - 1 ) {
            files += ','
        }
    }
    files += '}';
    console.log(logtext);
    return JSON.parse(files);
}

  //タスクの登録
    grunt.registerTask('default', ['clean', 'merge-json', 'pug', 'stylus', 'concat', 'uglify']);
    grunt.registerTask('server', ['default', 'connect', 'watch']);

}