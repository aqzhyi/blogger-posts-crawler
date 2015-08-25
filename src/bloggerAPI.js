import _ from 'lodash'
import asyncLog from './asyncLog'
import debug from 'debug'
import isUrl from 'is-url'
import request from 'request-promise'

import imgDigger from 'html-img-digger'
import addrDigger from 'html-taiwan-address-digger'

let log = debug('blogger-posts-crawler:bloggerAPI')

/**
Get posts of blogger by bloggerId

link: https://developers.google.com/apis-explorer/?hl=en_US#p/blogger/v3/blogger.posts.list?blogId=7165299480265810458&fetchBodies=false&fetchImages=false&maxResults=500&status=live&_h=1&
*/
function getPostsList(bloggerId, qs = {}, opts = {}) {

  let log2 = debug(log.namespace + ':getPostsList')

  if (!bloggerId) {
    Promise.reject(`${log2.namespace}: expect first arg to be a number as bloggerId`)
  }

  qs = _.defaults({}, qs, {
    key: null,
    maxResults: 20,
    status: 'live',
    fetchBodies: true,
    fetchImages: false,
    pageToken: undefined,
  })

  log2(`[start] get posts by bloggerId: ${bloggerId}, pageToken: ${qs.pageToken}`)

  return request({
    json: true,
    method: 'GET',
    url: `https://www.googleapis.com/blogger/v3/blogs/${bloggerId}/posts`,
    qs,
  })
  .then(asyncLog(log2), asyncLog(log2))
  .then(async (result) => {

    for (let item of result.items) {
      item.address = await addrDigger.dig(item.content) || []
      item.images = await imgDigger.dig(item.content) || []

      if (item.location && item.location.name) {
        item.address.unshift(item.location.name)
      }
    }

    let items = _.map(result.items, (item) => {

      return {
        address: item.address,
        body: item.content,
        cover: _.get(item, 'images[0].url', ''),
        datetime: item.published,
        images: _.pluck(item.images, 'url'),
        title: item.title,
        url: item.url,
      }
    })

    if (result.nextPageToken) {
      items.nextPageToken = result.nextPageToken
    }

    return items
  })
}

/**
Get detail of blogger by blogspot url
@param qs {object} Url query string params
@param qs.key {string} API key
@return {Promise(object)} Try https://developers.google.com/apis-explorer/?hl=en_US#p/blogger/v3/blogger.blogs.getByUrl?url=http%253A%252F%252Fhappycloud2013.blogspot.tw%252F&_h=6&
*/
function getByUrl(qs = {}) {

  let log2 = debug(log.namespace + ':getByUrl')

  qs = _.defaults({}, qs, {
    key: null,
  })

  log2(`[start] GET byUrl ${qs.url}`)

  return request({
    json: true,
    method: 'GET',
    url: `https://www.googleapis.com/blogger/v3/blogs/byurl`,
    qs,
  })
  .then(asyncLog(log2), asyncLog(log2))
}

export default {
  getByUrl,
  getPostsList
}
