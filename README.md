# Blogspot crawler

## Preview

![](http://i.imgur.com/9zvm3KE.png)

## Usage

```sh
npm install blogger-posts-crawler --save
```

## API

#### .findAll()

```
@name findAll
@param {object} options
@param {boolean} [options.fetchAll=false] - If you want to retrieve all the articles form google.
@param {string} options.url - Url of Blogspot.
@param {string} options.key - Server-side API access token from Google Blogger API.
@returns {Article[]}
```

###### Example

```js
import crawler from 'blogger-posts-crawler'

let articles = await crawler.findAll({
  url: 'http://happycloud2013.blogspot.tw/',
  fetchAll: false,
  key: YOUR_API_KEY,
})

console.log(articles) // {Article[]}
```

## Interfaces

#### Article

```
@name Article
@interface
@prop {string[]} address
@prop {string} body - Content of article
@prop {string} cover - Generally first element of Article.images
@prop {string[]} images - Contain URL format in the array.
@prop {string} published - ISO8601 format
@prop {string} title
@prop {string} url
```

## Development Flow

```
vi src/index.js
:wq
npm test
git commit -m 'minor changes'
```

## test

```sh
npm test
```
