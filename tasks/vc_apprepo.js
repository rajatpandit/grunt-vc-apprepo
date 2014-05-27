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

  grunt.registerTask('apprepo', 'Plugin to create landing page for ios and android apps and push it to a remote server', function(build_id, start_commit, end_commit) {
    var options = this.options(),
        git     = 'git',
        done    = this.async(),
        exec    = require('child_process').exec,
        ejs     = require('ejs'),
        async   = require('async'),
        fs      = require('fs'),
        command = 'cd ' + options['repo_path'] + ' && git log ' + start_commit + '..' + end_commit + ' --pretty="%H|%ae|%s"',


        parse_commits = function(commits) {
            var logs  = [];
            commits   = commits.split('\n');
            commits.pop();
            commits.forEach(function(commit) {
                commit = commit.split('|');
                var single_commit = {
                    'hash'   : commit[0],
                    'author' : commit[1],
                    'msg'    : commit[2]
                };
                logs.push(single_commit);
            });
            if (logs.length){
                grunt.log.writeln('Found the following change logs');
                grunt.log.writeln('---');
                logs.forEach(function(log) {
                    grunt.log.writeln("%s - %s (%s)", log.hash.substr(0,5), log.msg, log.author);
                });
                grunt.log.writeln('---');
            }
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
                html_file         = options['output_path'] + 'index.html',
                manifest_template = template_path + 'manifest.plist.ejs',
                manifest_file     = options['output_path'] + 'manifest.plist';

            // get parse the output of the manifest
            var manifest_output = ejs.render(fs.readFileSync(manifest_template, 'utf-8'), {
                app_url   : options['http_url'] + build_id,
                bundle_id : options['bundle_id'],
                app_name  : options['app_name']
            });

            var html_output = ejs.render(fs.readFileSync(html_template, 'utf-8'), {
                app_url         : options['http_url'] + build_id,
                build_id        : build_id,
                app_description : options['app_description'],
                app_name        : options['app_name'],
                logs            : logs
            });
            fs.writeFile(html_file, html_output, function(err) {
                if (err) {
                    grunt.log.writeln('Error writing to %s', html_file);
                } else {
                    grunt.log.writeln('Wrote updated landing page at %s', html_file);
                }
            });
            fs.writeFile(manifest_file, manifest_output, function(err) {
                if (err) {
                    grunt.log.writeln('Error writing to %s', manifest_file);
                } else {
                    grunt.log.writeln('Wrote updated manifest file at %s', manifest_file);
                }
            });
    }]);

    });
};
