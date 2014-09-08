module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({

      // JS TASKS ================================================================
      // 
      // check all js files for errors
      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: ['public/scripts/app.js', 'public/scripts/*/*.js', 'server/**/*.js'],
      },

      // take all the js files and minify them into app.min.js
      uglify: {
        build: {
          options: {
            //beautify: true,
            mangle: false
          },
          files: {
            'public/build/app.min.js': ['public/scripts/**/*.js']
          }
        }
      },

        // compile all jade files
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

        // build every .styl file to a single site.css file
        stylus: {
            options: {
                compress: true
            },
            compile: {
                files: {
                    'public/styles/site.css': ['public/styles/*.styl']
                }
            }
        },


        // watch css and js files and process the above tasks
        watch: {
          css: {
            files: ['public/styles/*.styl'],
            tasks: ['newer:stylus']
          },
          js: {
            files: ['public/scripts/app.js', 'public/scripts/*/*.js', 'server/**/*.js'],
            tasks: ['jshint', 'uglify']
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');

    // define the tasks

    // Default: check with jshint, build everything, run server and watch for changes
    grunt.registerTask(
        'default',
        [ 'jshint', 'newer:stylus', 'uglify', 'concurrent' ]
    );

    // JShint: check all javascript files
    grunt.registerTask(
        'JShint',
        [ 'jshint' ]
    );

    // Build: check javascript with jshint, and then build everything
    grunt.registerTask(
        'build',
        [ 'jshint', 'newer:stylus', 'uglify' ]
    );

};
