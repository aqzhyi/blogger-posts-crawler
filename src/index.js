import _ from 'lodash'
import isUrl from 'is-url'
import request from 'request-promise'
import bloggers from './bloggerAPI'

async function findAll(opts = {}) {

  opts = _.defaultsDeep({}, opts, {
    fetchAll: false,
    key: null,
    url: null,
  })

  if (!isUrl(opts.url)) Promise.reject('blogger-posts-crawler:findAll: expect first arg to be object and to have key "url"')
  if (!isUrl(opts.key)) Promise.reject('blogger-posts-crawler:findAll: expect first arg to be object and to have key "key"')

  let {id} = await bloggers.getByUrl({ url: opts.url, key: opts.key })
  let posts = await bloggers.getPostsList(id, { key: opts.key })

  while (opts.fetchAll && posts.nextPageToken) {
    let nextPagePosts = await bloggers.getPostsList(id, { pageToken: posts.nextPageToken, key: opts.key })
    posts = posts.concat(nextPagePosts)
    posts.nextPageToken = nextPagePosts.nextPageToken
  }

  return posts
}

export default {
  findAll
}
