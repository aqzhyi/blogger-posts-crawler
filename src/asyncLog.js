import _ from 'lodash'

function log(log) {

  return (result) => {
    let error = _.get(result, 'error.error')

    if (error) {
      let {message, code} = error

      log(`[bad] {code, message} = {${code}, '${message}'}`)

      return Promise.reject(result)
    }
    else {
      log(`[ok]`)

      return Promise.resolve(result)
    }
  }
}

export default log
