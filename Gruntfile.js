module.exports = function(grunt){
    grunt.initConfig({
        pug: {
            compile: {
                files: {
                    'docs/index.html' : ['src/pug/index.pug']
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
            files: ['src/pug/**/*.pug', 'src/styl/**/*.styl'],
            tasks: ['pug', 'stylus']
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
    grunt.loadNpmTasks('grunt-contrib-watch');

  //タスクの登録
    grunt.registerTask('default', ['pug', 'stylus']);
    grunt.registerTask('server', ['pug', 'stylus', 'connect', 'watch']);
}