module.exports = function(grunt) {
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
        jsbeautifier: {
            files: ['Gruntfile.js', 'app/**/*.js', '!app/modules/**/*.js', 'index.html', 'app/views/**/*.htm'],
            options: {
                //config: "path/to/configFile",
                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 4
                },
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },
        'sails-linker': {
            defaultOptions: {
                options: {
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->',
                    fileTmpl: '<script src="%s"></script>',
                    appRoot: ''
                },
                files: {
                    // Target-specific file lists and/or options go here.
                    'index.html': ['app/config/**/*.js', 'app/controllers/**/*.js', 'app/services/**/*.js']
                },
            },
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
