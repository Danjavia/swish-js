/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> Jordan Ranson;' +
            ' Licensed under the Apache2 license */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/css-swish.js'],
                dest: 'dist/css-swish.js'
            },
            jquery: {
                src: ['src/css-swish.js', 'src/jquery.css-swish.js'],
                dest: 'dist/jquery.css-swish.js'
            },
            css: {
                src: ['src/css-swish-transitions.css'],
                dest: 'dist/css-swish-transitions.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            native: {
                src: 'dist/css-swish.js',
                dest: 'dist/css-swish.min.js'
            },
            jquery: {
                src: 'dist/jquery.css-swish.js',
                dest: 'dist/jquery.css-swish.min.js'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    'dist/css-swish-transitions.css': ['dist/css-swish-transitions.css']
                }
            }
        },
        cssmin: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                files: {
                    'dist/css-swish-transitions.min.css': ['dist/css-swish-transitions.css']
                }
            }
        },
        compress: {
            javascript: {
                options: {
                    archive: 'demo/css-swish-js.zip'
                },
                files: [
                    {
                        src: [
                            'dist/css-swish.js',
                            'dist/css-swish.min.js',
                            'dist/css-swish-transitions.css',
                            'dist/css-swish-transitions.min.css'
                        ],
                        filter: 'isFile'
                    }
                ]
            },
            jquery: {
                options: {
                    archive: 'demo/css-swish-jquery.zip'
                },
                files: [
                    {
                        src: [
                            'dist/jquery.css-swish.js',
                            'dist/jquery.css-swish.min.js',
                            'dist/css-swish-transitions.css',
                            'dist/css-swish-transitions.min.css'
                        ],
                        filter: 'isFile'
                    }
                ]
            }
        },
        watch: {
            gruntfile: {
                files: ['src/*.css', 'src/*.js'],
                tasks: ['default']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task.
    grunt.registerTask('default', ['concat', 'uglify', 'autoprefixer', 'cssmin', 'compress']);
    grunt.registerTask('spy', ['default', 'watch']);

};
