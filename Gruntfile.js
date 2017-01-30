var src = {
   'pug': ['src/pug/**/*.pug', '!' + 'src/pug/**/_*.pug'],
   'everypug': 'src/pug/**/*.pug',
   'json': 'settings/**/*.json',
   'styl': ['src/styl/**/*.styl', '!' + 'src/styl/**/_*.styl'],
   'everystyl': 'src/styl/**/*.styl'
};

var dest = {
    'root': 'docs/',
    'css': 'docs/css',
    'everything': ['docs/**/*', '!' + 'docs/CNAME']
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
                        return require('./docs/suiranfes.json');
                    }
                },
                files: {
                    'docs/index.html' : ['src/pug/index.pug'],
                    'docs/access.html' : ['src/pug/access.pug'],
                    'docs/food.html' : ['src/pug/food.pug']
                }
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

grunt.task.registerTask( 'merge-json' , 'Merge All Settings' , function(){
    var resultObj = { options: "" };
    grunt.file.recurse('./settings/', process );
    function process(abspath, rootdir, subdir, filename){
        console.log('Processing ' + filename);
        if( filename.indexOf('.json') > -1 ){
            bookObj = require('./'+abspath);
            for (var key in bookObj) {
                resultObj = arrayMerge( resultObj , bookObj );
            }
        }
    }
    grunt.file.write( 'docs/suiranfes.json' , JSON.stringify( resultObj ) );
});
  //タスクの登録
    grunt.registerTask('default', ['clean', 'merge-json', 'pug', 'stylus']);
    grunt.registerTask('server', ['default', 'connect', 'watch']);
}