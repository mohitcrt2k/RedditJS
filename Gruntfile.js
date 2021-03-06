module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {

            desktopJS: {
                options: {
                    baseUrl: "public/js/app",
                    "findNestedDependencies": true,
                    wrap: true,
                    // Cannot use almond since it does not currently appear to support requireJS's config-map
                    //name: "../lib/almond",
                    preserveLicenseComments: false,
                    optimize: "uglify",
                    wrapShim: true,
                    hbs: {
                        disableI18n: true,
                        disableHelpers: true,
                        templateExtension: "html",
                        //  helperDirectory: "template/helpers/",
                        //  i18nDirectory: "template/i18n/",

                        compileOptions: {} // options object which is passed to Handlebars compiler
                    },
                    mainConfigFile: "public/js/app/config/config.js",
                    include: ["init/DesktopInit"],
                    out: "public/js/app/init/DesktopInit.min.js"
                }
            },
            desktopCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./public/css/styles.css",
                    out: "./public/css/styles.min.css"
                }
            },
            darkCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./public/css/dark/styles.css",
                    out: "./public/css/dark/styles.min.css"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
            options: {
                asi: true,
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,

                    document: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['requirejs:desktopJS', 'requirejs:desktopCSS', 'requirejs:darkCSS']);
    grunt.registerTask('default', ['test', 'build']);
};