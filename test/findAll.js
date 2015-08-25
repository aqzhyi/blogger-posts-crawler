import _ from 'lodash'
import {expect} from 'chai'
import crawler from '../src/index'
import isISO from 'isostring'
import isUrl from 'is-url'

describe('findAll', function() {

  this.timeout(10 * 1000)

  it('測試參數 fetchAll: false', () => {

    return crawler
    .findAll({ url: 'http://natasha543.blogspot.tw/', fetchAll: false, key: 'AIzaSyDWtio5JN5cvkXbv7kr49Tt9pM6mVio4Co' })
    .then((result) => {
      expect(result).to.have.length.within(0, 20)
    })
  })

  it('測試參數 fetchAll: true', () => {
    // http://natasha543.blogspot.tw/ 實際情況它應該會有70~80筆文章左右
    // 所以我拿他來測試 fetchAll，除非他把文章都刪除了

    return crawler
    .findAll({ url: 'http://natasha543.blogspot.tw/', fetchAll: true, key: 'AIzaSyDWtio5JN5cvkXbv7kr49Tt9pM6mVio4Co' })
    .then((result) => {
      expect(result).to.have.length.above(20)
    })
  })

  it('清單物件，應有以下基本屬性', () => {

    // http://natasha543.blogspot.tw/ 實際情況它應該會有70~80筆文章左右
    // 所以我拿他來測試 fetchAll，除非他把文章都刪除了

    return crawler
    .findAll({ url: 'http://natasha543.blogspot.tw/', fetchAll: false, key: 'AIzaSyDWtio5JN5cvkXbv7kr49Tt9pM6mVio4Co' })
    .then((result) => {
      expect(result).to.be.an('array')

      _.forEach(result, (item) => {
        expect(item).to.be.an('object')
        expect(item).to.include.keys('title', 'address', 'images', 'cover', 'url', 'datetime', 'body')

        expect(isISO(item.datetime)).to.equal(true, 'key datetime must be format ISO8601: string')
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
})
