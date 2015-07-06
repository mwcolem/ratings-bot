module.exports = function (grunt) {

    // configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dest: 'target/build',
        copy: {
            buildtarget: {
                files: [
                    {cwd: 'src/main/js/', src: ['**/*.js'], dest: '<%= dest %>/lib', expand: true},
                    {cwd: 'src/main/resources', src: ['**'], dest: '<%= dest %>', expand: true},
                    {src: 'package.json', dest: '<%= dest %>/'}
                ]
            }
        },
        uglify: {
            core: {
                files: [{
                    expand: true,
                    cwd: '<%= dest %>/lib',
                    src: '**/*.js',
                    dest: '<%= dest %>/lib',
                    ext: '.min.js'
                }]
            }
        },
        jshint: {
            files: [
                'GruntFile.js',
                '<%= dest %>/lib/**/*.js',
                '!<%= dest %>/lib/**/*.min.js'
            ]
        },
        clean: {
            js: ['<%= dest %>/lib/**/*.js', '!<%= dest %>/lib/**/*.min.js']
        },
        compress: {
            main: {
                options: {
                    mode: 'zip',
                    archive: 'target/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                expand: true,
                cwd: '<%= dest %>/',
                src: ['**/*']
            }
        },
        execute: {
            target: {
                options: {
                    cwd: '<%= dest %>/'
                },
                src: ['<%= dest %>/lib/app.min.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-execute');

    grunt.registerTask('default', ['copy:buildtarget', 'jshint', 'uglify', 'clean', 'compress']);
    grunt.registerTask('deploy', ['execute']);
};