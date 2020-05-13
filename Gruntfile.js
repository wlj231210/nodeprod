module.exports = function (grunt) {
    var apidoc = require('apidoc');
    grunt.registerMultiTask('apidoc', 'Create REST-API-Documentation with apidoc', function () {
        var config = this.data;
        var options = config.options || {};

        grunt.log.subhead('grunt-apidoc');

        // options
        options.src = config.src || config.i || options.i;
        options.dest = config.dest || config.o || options.o;
        options.template = config.template || config.t || options.t;

        // execute
        var result = apidoc.createDoc(options);

        if (result === false) {
            grunt.log.error('grunt-apidoc error: Execution terminated (set \'options: { debug: true }\' in Gruntfile.js for details.');
            return false;
        }
        else {
            grunt.log.ok('grunt-apidoc finished.');
            return true;
        }
    });
    grunt.initConfig({
        apidoc: {
            nodeprod: {
                src: "routes/",
                dest: "doc/",
                options: {
                    debug: true,
                    includeFilters: [
                        ".*\\.js$"
                    ],
                    excludeFilters: [
                        "node_modules/"
                    ]
                }
            }
        }
    })


    grunt.loadNpmTasks('grunt-apidoc');
};