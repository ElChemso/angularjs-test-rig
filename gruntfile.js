module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	concat: {
	  options: {
		// define a string to put between each file in the concatenated output
		separator: '\n'
	  },
	  dist: {
		// the files to concatenate
		src: ['app/**/*.module.js','app/**/*.js','app/*.js','app/**/**/*.js'],
		// the location of the resulting JS file
		dest: 'dist/<%= pkg.name %>.js'
	  }
	},
	uglify: {
	  options: {
		// the banner is inserted at the top of the output
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
	    mangle: false
	  },
	  dist: {
		files: {
		  'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
		}
	  }
	},
	jshint: {
	  // define the files to lint
	  files: ['package.json','gruntfile.js', 'app/**/*.js'],
	  all: {
		  src: ['<%= jshint.files %>']
	  },
	  
	  // configure JSHint (documented at http://www.jshint.com/docs/)
	  options: {
		  // more options here if you want to override JSHint defaults
        reporterOutput: '',   
		globals: {
		  jQuery: true,
		  console: true,
		  module: true
		}
	  }
	},
    copy: {
        main:{
            expand: true,
			flatten: true,
			src: ['app/*.html'],
			dest: 'dist/',
			filter: 'isFile'
        },
		html:{
			expand: true,
			src: 'app/*/**/*.html',
			dest: 'dist/'
		},
        angular:{
            expand: true,
            src: 'node_modules/angular/angular.min.js',
            dest: 'dist/',
            flatten: true,
            filter: 'isFile'
        }
    },
	watch: {
	  files: ['<%= jshint.files %>'],
	  tasks: ['dev']
	}
    
  });
  
   grunt.loadNpmTasks('grunt-newer');  
   grunt.loadNpmTasks('grunt-contrib-jshint');	
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.registerTask('dev', [], function() {
    grunt.task.run('newer:jshint:all');
    grunt.task.run('concat');
    grunt.task.run('uglify');
    grunt.task.run('copy');
  }); 

	// the default task can be run just by typing "grunt" on the command line
	grunt.registerTask('default', ['watch']);
};