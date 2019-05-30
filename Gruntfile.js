module.exports = function(grunt) {
    // Import
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://<%= pkg.homepage %>/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            '<%= pkg.author.name %>; Licensed MIT */',
        clean: {
            build: {
                src: ['dist/*']
            }
        },
        copy: {
            images: {
                expand:     true,
                cwd:        'src/images',
                src:        ['**/*'],
                dest:       'dist/images/',
            },
            files: {
                expand:     true,
                cwd:        './',
                src:        ['*.html'],
                dest:       'dist/',
            },

        },
        sass: {
            // Nom de la tâche
            dev: {
                // Nom de la sous-tâche
                options: {
                    // Options
                    style: "expanded",
                },
                files: [
                    {
                        // C'est ici que l'on définit le dossier que l'on souhaite importer
                        expand: true,
                        cwd: "src/styles/",
                        src: ["main.scss"],
                        dest: "dist/styles/",
                        ext: ".css",
                    },
                ],
            },
            dist: {
                // Nom de la sous-tâche
                options: {
                    // Options
                    style: "compressed",
                },
                files: [
                    {
                        // C'est ici que l'on définit le dossier que l'on souhaite importer
                        expand: true,
                        cwd: "src/styles/",
                        src: ["main.scss"],
                        dest: "dist/styles/",
                        ext: ".min.css",
                    },
                ],
            },
        },
        cssmin: {
            // dans le cas ou plusieurs fichiers sont present
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    // 'output.css': ['foo.css', 'bar.css']
                }
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            dev: {                                       // Another target
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['src/**/*.html', '*.html'],
                    dest: 'dist'
                }]
            }
        },
        concat: {
            options: {
                separator: " ", // permet d'ajouter un point-virgule entre chaque fichier concaténé.
            },
            dist: {
                src: ["src/js/main.js","src/js/extra.js"], // la source
                dest: "dist/js/built.js", // la destination finale
            },
        },
        jshint: {
            beforeconcat: ["src/js/main.js","src/js/extra.js"],
            afterconcat: ["dist/js/built.js"],
            options: {
                reporter: require('jshint-stylish'),
                esversion: 6
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "dist/js/app.js": "dist/js/built.js"
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: ["dist/js/app.js"], // la source
                dest: "dist/js/main<%= pkg.version %>_<%= grunt.template.today(\"yyyy-mm-dd\") %>.min.js", // la destination finale
            },
        },
        replace: {
            dist: {
                src: ['dist/*.html'],
                overwrite: true,
                replacements: [{
                    from: "dist/css/bootstrap.css",
                    to: "css/bootstrap.min.css"
                }, {
                    from: "dist/js/main.js",
                    to: "js/main<%= pkg.version %>_<%= grunt.template.today(\"yyyy-mm-dd\") %>.min.js"
                }]
            }
        },

        connect: {
            all: {
                options:{
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35729
                }
            }
        },
        watch: {
            options: {
                livereload: 35729
            },
            images: {
                files: 'src/images/**',
                tasks: ['copy:images'],
            },
            scripts: {
                files: '**/*.js', // tous les fichiers JavaScript de n'importe quel dossier
                tasks: ['dist-js']
            },
            styles: {
                files: '**/*.scss', // tous les fichiers Sass de n'importe quel dossier
                tasks: ['']
            }
        }
    });

    // Redéfinition de la tâche `default` qui est la tâche lancée dès que vous lancez Grunt sans rien spécifier.
    // Note : ici, nous définissons sass comme une tâche à lancer si on lance la tâche `default`.

    // child
    grunt.registerTask("duplicate",["copy:images","copy:files"]);
    grunt.registerTask("dist-js",["jshint:beforeconcat","concat:dist","babel","uglify","jshint:afterconcat"]);

    // prod
    grunt.registerTask("default",["clean","sass:dist","dist-js","duplicate","htmlmin:dist","replace:dist"]);
    // dev
    grunt.registerTask("dev",["sass:dev","concat:dist"]);
    // Start web server
    grunt.registerTask('serve', ['connect:all','watch']);
};