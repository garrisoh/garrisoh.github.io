'use strict';

var path = require('path');

module.exports = function(grunt) {
	grunt.initConfig({
		// Injects bower dependencies into html
		wiredep: {
			build: {
				src: ['src/index.html']
			}
		},

		// Error checking for js files.  Set jshint to use jshint-stylish.
		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				'-W097': true, // Don't need to require function form of use strict
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
			build: ['src/index.html']
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
			build: {
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
			build: {
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
				tasks: ['sasslint', 'sass', 'postcss']
			},
			html: {
				files: ['src/*.html'],
				tasks: ['htmlhint']
			}
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

	// Set tasks to run by default (dev mode), for production, and for testing
	grunt.registerTask('default', ['wiredep', 'jshint:dev', 'htmlhint', 'sasslint', 'sass', 'postcss', 'open', 'watch']);
	grunt.registerTask('dev', ['wiredep', 'jshint:dev', 'htmlhint', 'sasslint', 'sass', 'postcss', 'open', 'watch']);
	grunt.registerTask('dist', ['wiredep', 'jshint:dist', 'htmlhint', 'sasslint', 'sass', 'postcss']);
};
