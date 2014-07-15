module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({


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
        }

    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-stylus');

    // define the tasks
    grunt.registerTask(
        'default',
        [ 'stylus' ]
    );

};