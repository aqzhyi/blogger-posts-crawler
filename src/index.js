import _ from 'lodash'
import isUrl from 'is-url'
import request from 'request-promise'
import bloggers from './bloggerAPI'

/**
@name Article
@interface
@prop {string[]} address
@prop {string} body - Content of article
@prop {string} cover - Generally first element of Article.images
@prop {string[]} images - Contain URL format in the array.
@prop {string} published - ISO8601 format
@prop {string} title
@prop {string} url
*/

/**
@name findAll
@param {object} options
@param {boolean} [options.fetchAll=false] - If you want to retrieve all the articles form google.
@param {string} options.url - Url of Blogspot.
@param {string} options.key - Server-side API access token from Google Blogger API.
@returns {Article[]}
*/
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
