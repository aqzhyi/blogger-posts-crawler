# blogger-posts-crawler

# Preview

![](http://i.imgur.com/sKJDBXN.png)

# Usage

> .findAll({ url: string, fetchAll: boolean, key: string })

```js
// ES6
import crawler from 'blogger-posts-crawler'

crawler
.findAll({
  url: 'http://happycloud2013.blogspot.tw/',
  fetchAll: false,
  key: YOUR_API_KEY,
})
.then((result) => {
  console.log(result)

  // [{
  //   address: Array<string<URL>>
  //   body: string<HTMLString>
  //   cover: string<URL>
  //   datetime: string<ISO8601>
  //   images: Array<string<URL>>
  //   title: string
  //   url: string<URL>
  // }]
})
```
