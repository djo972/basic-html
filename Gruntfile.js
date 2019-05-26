module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['dist/*']
            }
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
                        ext: ".css",
                    },
                ],
            },
        },
        concat: {
            options: {
                separator: ";", // permet d'ajouter un point-virgule entre chaque fichier concaténé.
            },
            dist: {
                src: ["src/js/main.js","src/js/extra.js"], // la source
                dest: "dist/js/built.js", // la destination finale
            },
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
                separator: ";",
            },
            dist: {
                src: ["dist/js/app.js"], // la source
                dest: "dist/js/app.min.js", // la destination finale
            },
        },
        connect: {
            all: {
                options:{
                    port: 9000,
                    hostname: 'localhost',
                    livereload: 35729,
                    // base: 'http://localhost/src/'
                }
            }
        },
        watch: {
            options: {
                livereload: 35729
            },
            scripts: {
                files: '**/*.js', // tous les fichiers JavaScript de n'importe quel dossier
                tasks: ['clean']
            },
            styles: {
                files: '**/*.scss', // tous les fichiers Sass de n'importe quel dossier
                tasks: ['clean']
            }
        }
    });

    // Import du package
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Redéfinition de la tâche `default` qui est la tâche lancée dès que vous lancez Grunt sans rien spécifier.
    // Note : ici, nous définissons sass comme une tâche à lancer si on lance la tâche `default`.
    grunt.registerTask("default",["clean","sass:dist","concat:dist","babel","uglify"]);
    grunt.registerTask("dev",["sass:dev","concat:dist"]);
    // Start web server
    grunt.registerTask('serve', ['connect:all','watch']);
};