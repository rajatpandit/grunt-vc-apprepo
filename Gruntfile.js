/*
 * grunt-vc-apprepo
 * https://github.com/rajatpandit/grunt-vc-apprepo
 *
 * Copyright (c) 2014 Rajat Pandit
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    apprepo                : {
       options             : {
           title           : 'Build page for Digital Clubcard',
           http_url        : 'http://dc.ios.localhost/',
           repo_path       : '/home/rp/repo-generator/repo-generator',
           output_path     : '/var/www/apps/',
           branch          : 'master',
           app_name        : 'Digital Club Card',
           //bundle_id       : 'com.geo.bla',
           platform        : 'droid', // ios
           app_description : 'Brief description of the application would go here'
       },
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

};
