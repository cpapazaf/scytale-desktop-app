const spawn = require('child_process').spawn;
const gulp  = require('gulp');
const maps  = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const css   = require('gulp-css');

/* Build */

gulp.task('build-css', () => {
    return gulp.src('src/**/*.css')
        .pipe(css())
        .pipe(gulp.dest('app/'));
});

gulp.task('build-js', () => {
        return gulp.src(['main.js', 'src/**/*.js', '!src/**/*.test.js'])
            .pipe(maps.init())
            .pipe(babel())
            .pipe(maps.write('.'))
            .pipe(gulp.dest('app/'));
});


gulp.task('build', ['build-css', 'build-js']);


/* Copy */

gulp.task('copy-html', () => {
    gulp.src('src/*.html').pipe(gulp.dest('app/'));
});

gulp.task('copy-assets', () => {
  gulp.src('assets/**/*').pipe(gulp.dest('app/assets'));
});

gulp.task('copy', ['copy-html', 'copy-assets']);



/* Execute */

const cmd   = (name) => 'node_modules/.bin/' + name;
const args  = (more) => Array.isArray(more) ? ['.'].concat(more) : ['.'];
const exit  = () => process.exit();
const electron = require('electron-connect').server.create({
  verbose: true
});

gulp.task('restart:browser', done => {
  electron.stop();
  electron.restart();
  done();
});

gulp.task('reload:renderer', done => {
  // Reload renderer process
  electron.reload();
  done();
});

gulp.task('dev', ['copy', 'build'], () => {
  //Start browser process
  electron.start();
  // Restart browser process
  gulp.watch('src/**/*.js', ['build','restart:browser']);
  // Reload renderer process
  gulp.watch('src/**/*.css', ['build','reload:renderer']);
  gulp.watch('src/**/*.html', ['build','reload:renderer']);
  gulp.watch('src/**/*.js', ['build','reload:renderer']);
});

gulp.task('start', ['copy', 'build'], () => {
    spawn(cmd('electron'), args(), { stdio: 'inherit' }).on('close', exit);
});


gulp.task('release', ['copy', 'build'], () => {
    spawn(cmd('electron-builder'), args(), { stdio: 'inherit' }).on('close', exit);
});

gulp.task('test', ['copy', 'build'], () => {
    spawn(cmd('jest'), args(), { stdio: 'inherit' }).on('close', exit);
});


