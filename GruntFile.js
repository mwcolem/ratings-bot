module.exports = function (grunt) {

    // configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dest: 'target/build',
        copy: {
            buildtarget: {
                files: [
                    {src: ['*.js', '!GruntFile.js'], dest: '<%= dest %>/', expand: true},
                    {src: ['package.json', 'README.md'], dest: '<%= dest %>/', expand: true}
                ]
            }
        },
        uglify: {
            core: {
                files: [{
                    expand: true,
                    cwd: '<%= dest %>',
                    src: '**/*.js',
                    dest: '<%= dest %>',
                    ext: '.js'
                }]
            }
        },
        jshint: {
            files: [
                'GruntFile.js',
                '<%= dest %>/**/*.js',
                '!<%= dest %>/**/*.min.js'
            ]
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
                src: ['<%= dest %>/index.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-execute');

    grunt.registerTask('default', ['copy:buildtarget', 'jshint', 'uglify', 'compress']);
    grunt.registerTask('deploy', ['execute']);
};