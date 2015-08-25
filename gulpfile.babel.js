import gulp from 'gulp'
import {watch, babel, less} from 'easy-gulp-task'
import Run from 'run-sequence'
import del from 'del'

let run = Run.use(gulp)

gulp.task('dev', () => {
  run(
    'clean',
    ['babel'],
    'watch'
  )
})

gulp.task('watch', watch({
  babel: () => run('babel')
}))

gulp.task('build', (done) => {
  run(
    'clean',
    ['babel'],
    done
  )
})

gulp.task('clean', (done) => {
  del('./dist', done)
})

gulp.task('babel', babel({
  babel: {
    optional: ['runtime']
  }
}))
