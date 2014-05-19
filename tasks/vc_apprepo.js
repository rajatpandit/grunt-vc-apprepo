/*
 * grunt-vc-apprepo
 * https://github.com/rajatpandit/grunt-vc-apprepo
 *
 * Copyright (c) 2014 Rajat Pandit
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('apprepo', 'Plugin to create landing page for ios and android apps and push it to a remote server', function(build_id, start_commit, end_commit, binary_name) {
    var options = this.options(),
        git     = '/usr/bin/git',
        done    = this.async(),
        exec    = require('child_process').exec,
        ejs     = require('ejs'),
        async   = require('async'),
        fs      = require('fs'),
        command = 'cd /home/rp/repo-generator/repo-generator/ && git log ' + start_commit + '..' + end_commit + ' --pretty="%H|%ae|%s"',

        parse_commits = function(commits) {
            var logs  = [];
            commits   = commits.split('\n');
            commits.pop();
            commits.forEach(function(commit) {
                commit = commit.split('|');
                var single_commit = {
                    'hash': commit[0],
                    'author': commit[1],
                    'msg': commit[2]
                };
                logs.push(single_commit);
            });
            return logs;
        };

    async.waterfall([function(callback) {
        exec(command, function(err, stdout, stderr) {
            if(err) {
                grunt.log.writeln(stderr);
                throw err;
            }
            callback(null, parse_commits(stdout));
        });
    }, function(logs, callback) {
            var template_path     = __dirname + '/../templates/',
                html_template     = template_path + 'index.html.ejs',
                manifest_template = template_path + 'manifest.plist.ejs';

            // get parse the output of the manifest
            var manifest_output = ejs.render(fs.readFileSync(manifest_template, 'utf-8'), {
                app_url   : options['http_url'] + build_id,
                bundle_id : options['bundle_id'],
                app_name  : options['app_name']
            });

            var html_output = ejs.render(fs.readFileSync(html_template, 'utf-8'), {
                build_id: build_id,
                logs: logs
            });

    }]);

    });
};
