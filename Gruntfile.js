module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({

      // JS TASKS ================================================================

      // check all js files for errors
      jshint: {
        options: {
          jshintrc: '.jshintrc',
          indent: 2
        },
        all: ['public/scripts/app.js', 'public/scripts/**/*.js', 'server/**/*.js'],
      },

      // take all the js files and minify them into app.min.js
      uglify: {
        build: {
          options: {
            //beautify: true,
            mangle: false
          },
          files: {
            'public/dist/app.min.js': ['public/scripts/**/*.js']
          }
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

        // minify site css and themes css
        // and move them to the distribution folder
        cssmin: {
          add_banner: {
            options: {
              banner: '/* Minified site css file */'
            },
            files: {
              'public/dist/styles/site.min.css': ['public/styles/*.css'],
            }
          },
          minify: {
            expand: true,
            cwd: 'public/styles/themes',
            src: ['*.css', '!*.min.css'],
            dest: 'public/dist/styles/themes',
            ext: '.min.css'
          }
        },


        // watch css and js files and process the above tasks
        watch: {
          options: {
            livereload: true,
          },
          jade: {
            files: ['public/**/*.jade', 'server/**/*.jade']
          },
          stylus: {
            files: ['public/styles/*.styl'],
            tasks: ['newer:stylus']
          },
          css: {
            files: ['public/styles/**/**.css'],
            tasks: ['newer:cssmin']
          },
          js: {
            files: ['public/scripts/app.js', 'public/scripts/**/*.js', 'server/**/*.js'],
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
        },

        // open the app in the browser
        open: {
          server: {
            url: 'http://localhost:3030'
          }
        },


    });

    // load the tasks
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');

    // define the tasks

    // Default: check with jshint, build everything, run server and watch for changes
    grunt.registerTask(
        'default',
        [ 'jshint', 'newer:stylus', 'newer:cssmin', 'uglify', 'open', 'concurrent' ]
    );

    // JShint: check all javascript files
    grunt.registerTask(
        'JShint',
        [ 'jshint' ]
    );

    // Build: check javascript with jshint, and then make a new build of everything
    grunt.registerTask(
        'build',
        [ 'jshint', 'stylus', 'cssmin', 'uglify' ]
    );

};
