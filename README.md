# grunt-vc-apprepo

> Plugin to create fancy landing page with a QR code for ios and android apps (Coming soon)

## Getting Started
This plugin requires Grunt `~0.4.4`
TODO: Currently only provides landing page for iOS applications, android support to added soon.

![Alt text](https://github.com/rajatpandit/grunt-vc-apprepo/blob/master/docs/sample_page.png?raw=true "Sample Landing Page")

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vc-apprepo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-vc-apprepo');
```

## The "apprepo" task

### Overview
In your project's Gruntfile, add a section named `vc_apprepo` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  apprepo: {
    options: {
        http_url        : 'http://dc.ios.localhost/',                           // URL where the file will be hosted, to be used in the template/manifest.plist file
        repo_path       : '/home/rp/repo-generator/repo-generator',             // path of the git repo
        output_path     : '/var/www/apps/',                                     // where the html files need to be generated
        branch          : 'master',                                             // which branch to look at to read the log files
        app_name        : 'Digital App',                                        // Name of the app
        bundle_id       : 'com.geo.bla',                                        // iOS bundle id
        platform        : 'ios',                                                // platform current only iOS supported
        app_description : 'Brief description of the application would go here'  // description of the app
    },
  },
});
```

### Usage Examples
syntax:
apprepo:<build-id>:<start-commit-id>:<end-commit-id>:<name-of-the-app>:<version-of-app>


- name of the app: assuming that the file is going to be placed in the same level the manifest.plist file
- version-of-app: is the version in the ios app


```
> grunt apprepo:build1234:60a3dea9:7410837d:my-app-2.0.0+build1234.ipa:2.0.0+build1234
Running "apprepo:build1234:60a3dea9:7410837d" (apprepo) task
Found the following change logs
---
74108 - fixed the foreach issue with the commit log (ci.alert@gmail.com)
78ded - fixed changelogs issue if none were found (ci-alert@gmail.com)
3a830 - added the build id to the path as well (ci-alert@gmail.com)
483e6 - added a readme file (ci-alert@gmail.com)
6ed28 - fixed broken css links, updated path to load over ssl (ci-alert@gmail.com)
---
Wrote updated landing page at /var/www/apps/index.html
Wrote updated manifest file at /var/www/apps/manifest.plist
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
