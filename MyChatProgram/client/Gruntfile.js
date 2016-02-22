module.exports = function ( grunt ) {
 grunt.loadNpmTasks('grunt-contrib-jshint');
 var taskConfig = {
   jshint: {
     src: ['src/**/*.js'],
     gruntfile: ['Gruntfile.js'],
     options: {
        curly:  true,
        immed:  true,
        newcap: true,
        noarg:  true,
        sub:    true,
        boss:   true,
        eqnull: true,
        node:   true,
        undef:  true,
     globals: {
        _:       false,
        jQuery:  false,
        angular: false,
        moment:  false,
        console: false,
        $:       false,
        io:      false
    }
    }
    },
    concat: {
  js: {
    src: [
    'src/**/*.js',
    'src/*.js'
    ],
    dest: 'dest/js/concat.js'
    },
  css: {
    src: 'src/css/*.css',
    dest: 'dest/css/concat.css'
    }
},
cssmin: {
  js: {
    src: 'dest/js/concat.js',
    dest: 'dest/js/concat.min.js'
  },
  css:{
    src: 'dest/css/concat.css',
    dest: 'dest/css/concat.min.css'
  }
}
 };

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-css');
grunt.registerTask('default', ['jshint', 'concat', 'cssmin']);
grunt.initConfig(taskConfig);
};
