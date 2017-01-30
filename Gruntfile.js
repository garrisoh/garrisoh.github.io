'use strict';

var path = require('path');

module.exports = function(grunt) {
	grunt.initConfig({
		// Injects bower dependencies into html
		wiredep: {
			build: {
				src: ['src/*.html']
			}
		},

		// Error checking for js files.  Set jshint to use jshint-stylish.
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				'-W097': true,
				jquery: true
			},
			dev: {
				options: {
					devel: true
				},
				src: ['src/*.js']
			},

			// Distribution warns on console.log
			dist: {
				src: ['src/*.js']
			}
		},
		
		// Error checking for html files
		htmlhint: {
			build: ['src/*.html']
		},

		// Error checking for sass files
		sasslint: {
			build: ['src/sass/*.scss']
		},

		// Compiles sass to css
		sass: {
			options: {
				precision: 8
			},
			dev: {
				files: [{
					expand: true,
					cwd: 'src/sass/',
					src: '*.scss',
					dest: 'src/',
					ext: '.css'
				}]
			},
			dist: {
				options: {
					sourcemap: 'none'
				},
				files: [{
					expand: true,
					cwd: 'src/sass/',
					src: '*.scss',
					dest: 'src/',
					ext: '.css'
				}]
			}
		},

		// CSS autoprefixer (required by Bootstrap)
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({
						browsers: [
							"Android 2.3",
							"Android >= 4",
							"Chrome >= 20",
							"Firefox >= 24",
							"Explorer >= 8",
							"iOS >= 6",
							"Opera >= 12",
							"Safari >= 6"
						]
					})
				]
			},
			dev: {
				src: 'src/*.css'
			},
			dist: {
				options: {
					map: false,
				},
				src: 'src/*.css'
			}
		},

		// Automatically opens default browser
		open: {
			build: {
				path: path.join(__dirname, 'src', 'index.html')
			}
		},

		// Watch files for changes and run linters, reload page
		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			js: {
				files: ['src/*.js'],
				tasks: ['jshint:dev']
			},
			scss: {
				files: ['src/sass/*.scss'],
				tasks: ['sasslint', 'sass:dev', 'postcss:dev']
			},
			html: {
				files: ['src/*.html'],
				tasks: ['htmlhint']
			}
		},

		processhtml: {
			build: {
				files: ['src/*.html']
			}
		},

		// Cleans dev files
		clean: {
			files: ['src/*.map']
		}

	});

	// Load grunt plugins from npm
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-sass-lint');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-wiredep');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// Set tasks to run by default (dev mode), for production, and for testing
	grunt.registerTask('default', ['wiredep', 'jshint:dev', 'htmlhint', 'sasslint', 'sass:dev', 'postcss:dev', 'open', 'watch']);
	grunt.registerTask('dev', ['wiredep', 'jshint:dev', 'htmlhint', 'sasslint', 'sass:dev', 'postcss:dev', 'open', 'watch']);
	grunt.registerTask('dist', ['wiredep', 'jshint:dist', 'htmlhint', 'sasslint', 'sass:dist', 'postcss:dist', 'processhtml', 'clean']);
};
