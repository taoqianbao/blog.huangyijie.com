var exec = require('child_process').exec;
var gulp = require('gulp');
var yaml = require('js-yaml');
var fs = require('fs');
var git = require('gulp-git');
var runSequence = require('run-sequence');

gulp.task('default', function() {
    console.log("http://huangyijie.com")
});

gulp.task('beforedeploy', function(done) {
    runSequence('clonetheme', 'configtheme', 'gen', function() {
        console.log('before deploy done!');
    });
});

gulp.task('configtheme', function(cb) {

    var configFilePath = './themes/aloha/_config.yml';

    var c = yaml.safeLoad(fs.readFileSync(configFilePath, 'utf8'));

    c.menu.Cat = {
        name: '五阿哥是一只猫',
        value: 'http://5thcat.lofter.com/',
        icon: 'square',
        target: '_blank'
    };

    var y = yaml.safeDump(c);

    y = y.replace('\'http://5thcat.lofter.com/\'', 'http://5thcat.lofter.com/');

    fs.writeFileSync(configFilePath, y, 'utf8');

    cb();
})

gulp.task('clonetheme', function(cb) {
    git.clone('https://github.com/henryhuang/hexo-theme-aloha.git', { args: './themes/aloha' }, function(err) {
        if (err) {
            throw err;
        }
    });
})

gulp.task('gen', function(cb) {
    exec('hexo clean && hexo generate', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
})


gulp.task('server', function(cb) {
    exec('hexo clean && hexo generate && hexo server', function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
})
