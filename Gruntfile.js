module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({



        // compiles all jade files
        jade: {
          compile: {
            options: {
              data: {},
              pretty: true
            },
            files: [{
              expand: true,
              src: [ 'public/**/*.jade', 'server/**/*.jade' ],
              ext: '.html'
            }]
          }
        },

        /*
        * The stylus task is used to compile every file with .styl extension in the public/css file
        * into one single site.css file in the same directory.
        * Using multiple .styl files provides easy maintenance of the code.
        * Building everything in one .css file improves the performance.
        */
        stylus: {
            options: {
                compress: false
            },
            compile: {
                files: {
                    'public/css/site.css': ['public/css/*.styl']
                }
            }
        },


        // watch css and jade files and process the above tasks
        watch: {
          css: {
            files: ['public/css/*.styl'],
            tasks: ['newer:stylus']
          },
          jade: {
            files: ['**/*.jade'],
            tasks: ['newer:jade']
          }
        },

        // watch our node server for changes
        nodemon: {
          dev: {
            script: 'server.js'
          }
        },

        // run watch and nodemon at the same time
        concurrent: {
          options: {
            logConcurrentOutput: true
          },
          tasks: ['nodemon', 'watch']
        }  

    });

    // load the tasks
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');

    // define the tasks
    grunt.registerTask(
        'default',
        [ 'newer:stylus', 'newer:jade', 'concurrent' ]
    );

};