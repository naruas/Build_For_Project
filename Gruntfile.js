```javascript


/*
 *  date	- 20160316
 *  author	- jr
 *
 * */

module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt);
	
	grunt.initConfig({
		
		// Project configuration
		pkg: grunt.file.readJSON('package.json'),
		
		// Sass complies into Css
		sass: {
			/*dist: {
				options: {
					sourceMap: true,
					outputStyle: 'expanded'   // Values: nested, expanded, compact, compressed
				},
				files: {
					'asset/css/style.css': 'asset/sass/style.scss',
					'asset/css/mentoz_incheon.css': 'asset/sass/mentoz_incheon.scss',
				},
			},*/

			dist: {
				options: {
					sourceMap: true,
					outputStyle: 'expanded'   // Values: nested, expanded, compact, compressed
				},
				files: [{
				    expand: true,
				    cwd: 'asset/sass/',
					src: ['**/*.scss'],
					dest: 'asset/css/',
					ext: '.css'
			  }]
		    },
		},
		
	    // Autoprefixer
	    autoprefixer: {
		    options: {
		    	browsers: ['last 2 versions', 'ie 8', 'ie 9'],
		    	map: true,
		    },
		    no_dest_multiple: {
                src: 'asset/css/*.css'
		    }
	    },
		 
	    // Image Sprite
	    sprite:{
	    	all : {
				src:'images/icon/*.png',
				dest: 'images/sprite/spritesheet.png',
				retinaSrcFilter: ['images/icon/*@2x.png'],
				retinaDest: 'images/sprite/spritesheet@2x.png',
				destCss: 'asset/css/spritesheet.css',
				//padding:5,
			},
	    },
		 
	    // Css selector replace
	    css_selectors: {
			options: {
				mutations:[
		           {search:'.icon-',replace:'.'},
		           {search:'-over',replace:':hover'}
	           ]
			},
			your_target: {
				files:{
					'asset/css/spritesheet.css' :['asset/css/spritesheet.css']
				}
			}
	    },
	    
	  // to combine file
		concat: {
			options:{
				sourceMap:true,
			},
			css: {
				src: ['asset/css/style.css','asset/css/spritesheet.css'],
				dest: 'asset/css/style.css',
			},
		},
	    
	    // Cssmin
	    cssmin: {
			 options: {
				 sourceMap: true,
				 shorthandCompacting: false,
				 roundingPrecision: -1
			 },
			 target: {
				 files: {
					 'asset/css/style.min.css': ['asset/css/style.css'],
				 }
			 }
	    },
	    
	    // Cache breaker
	    cachebreaker: {
	    	md5: {
	    		options: {
                    replacement: "md5",
                    match: [
                            {
                             	'style.min.css': 'asset/css/style.min.css',
                            	'script.js': 'asset/js/script.js',
                            }
                        ]
                },
	            files: {
	            	src:[
	            	     'decorators/index.jsp',
	            	    ]
	            }
	        }
	    },
	    
		// Watch and build 
	    watch: {
	      css: {
	        files: ['asset/sass/**/*.scss','asset/js/**/*.js'],
	        tasks: ['sass','concat'], 
	        options:{
	        	spawn:false,
		    	livereload:true,
		    }
	      }
	    },
	    
	});
	
	// Default task(s)
	grunt.registerTask('default', [
	                                'sass',
	                                'sprite',
	                                'css_selectors',
	                                //'autoprefixer',
	                                'concat',
	                                'cssmin',
	                                //'watch'
     ]);
	
};

```
