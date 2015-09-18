import _ from 'lodash'
import {expect} from 'chai'
import crawler from '../src/index'
import isISO from 'isostring'
import isUrl from 'is-url'

describe('findAll', function() {

  this.timeout(10 * 1000)

  it('fetchAll: false', async () => {

    let article = await crawler.findAll({
      url: 'http://natasha543.blogspot.tw/',
      fetchAll: false,
      key: 'AIzaSyDWtio5JN5cvkXbv7kr49Tt9pM6mVio4Co',
    })

    expect(article).to.be.an('array')
    expect(article).to.have.length.below(31)
  })

  it('fetchAll: true', async () => {
    // http://natasha543.blogspot.tw/ 實際情況它應該會有70~80筆文章左右
    // 所以我拿他來測試 fetchAll，除非他把文章都刪除了

    let articles = await crawler.findAll({
      url: 'http://natasha543.blogspot.tw/',
      fetchAll: true,
      key: 'AIzaSyDWtio5JN5cvkXbv7kr49Tt9pM6mVio4Co',
    })

    expect(articles).to.be.an('array')
    expect(articles).to.have.length.above(30)
  })

  it('Basic usage', async () => {

    // http://natasha543.blogspot.tw/ 實際情況它應該會有70~80筆文章左右
    // 所以我拿他來測試 fetchAll，除非他把文章都刪除了

    let articles = await crawler.findAll({
      url: 'http://natasha543.blogspot.tw/',
      fetchAll: false,
      key: 'AIzaSyDWtio5JN5cvkXbv7kr49Tt9pM6mVio4Co',
    })

    expect(articles).to.be.an('array')

    _.forEach(articles, (item) => {
      expect(item).to.be.an('object')
      expect(item).to.include.keys('title', 'address', 'images', 'cover', 'url', 'published', 'body')

      expect(isISO(item.published)).to.equal(true, 'key published must be format ISO8601: string')
      expect(isUrl(item.cover)).to.equal(true, 'key cover must be format url: string')
      expect(isUrl(item.url)).to.equal(true, 'key url must be format url: string')
      expect(item.address).to.be.an('array', 'key address must be string[]')
      _.each(item.address, (item) => expect(item).to.be.a('string', 'key address[n] must be string'))
      expect(item.title).to.be.a('string', 'key title must be string')
      expect(item.body).to.be.a('string', 'key body must be string')
      expect(item.images).to.be.an('array', 'key images must be string[]')
      _.each(item.images, (item) => expect(item).to.be.a('string', 'key images[n] must be string'))
    })
  })
})
