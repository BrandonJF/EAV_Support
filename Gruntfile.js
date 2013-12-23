module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    //'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    //'head-script-disabled': false,
                    'style-disabled': true
                },
                src: ['index.html', 'app/views/**/*.htm']
            }
        }, //endhtmlhint
        jshint: {
            src: ['Gruntfile.js', 'app/**/*.js', 'app/*.js' /*,'tests/app/**/ /*.js'*/ ],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                jquery: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true,
                globals: {
                    angular: true,
                    eav: true,
                    _: true,
                    config: true,
                    require: true,
                    define: true,
                    requirejs: true,
                    describe: true,
                    expect: true,
                    module: true,
                    it: true
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.config.js',
                autoWatch: true
            }
        },
        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            }
        }
    });

    grunt.registerTask('default', ['htmlhint', 'jshint']);

};
