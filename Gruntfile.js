module.exports = function(grunt) {
    grunt.initConfig({
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
        uglify: {
            options: {
                separator: ";",
            },
            dist: {
                src: ["src/js/main.js","src/js/extra.js"], // la source
                dest: "dist/js/built.js", // la destination finale
            },
        },
    });

    // Import du package
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // Redéfinition de la tâche `default` qui est la tâche lancée dès que vous lancez Grunt sans rien spécifier.
    // Note : ici, nous définissons sass comme une tâche à lancer si on lance la tâche `default`.
    grunt.registerTask("default",["sass:dist","concat:dist","uglify:dist"]);
    grunt.registerTask("dev",["sass:dev","concat:dist"]);
};