var src = {
   'pug': ['src/pug/**/*.pug', '!' + 'src/pug/**/_*.pug'],
   'everypug': 'src/pug/**/*.pug',
   'json': 'config/**/*.json',
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
                    debug: false
                },
                files: listPages()
            }
        },
        stylus: {
            compile: {
                files: {
                    'docs/css/default.css' : ['src/styl/default.styl']
                }
            }
        },
        watch: {
            files: [src.everypug, src.json, src.everystyl, 'Gruntfile.js'],
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


function arrayMerge() {
    if (arguments.length === 0) return false;
    var i, len, key, result = {};
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
  //タスクの登録
    grunt.registerTask('default', ['clean', 'merge-json', 'pug', 'stylus']);
    grunt.registerTask('server', ['default', 'connect', 'watch']);


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

}