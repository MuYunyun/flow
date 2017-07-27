var keyword = process.argv[2]
var cheerio = require('cheerio')
var https = require('https')
var options = {
    host: 'www.zhihu.com',
    port: 443,
    path: '/search?type=content&q='+encodeURI(keyword)
}
console.error(keyword)
var html = ''
https.get(options, function(res) {
  res.on('data', function(data) {
    html += data
  }).on('end', function() {
    var $ = cheerio.load(html)
    var item = $('.contents').find('.item')
    var result_array = []
    for (var i = 0; i < item.length; i++) {
      result_array.push({
        title: item.eq(i).find('.title').text(),
        subtitle: item.eq(i).find('.content .entry-meta .author').text() === '' ? '进入专栏 ' + item.eq(i).find('.title').text() + ' ' : '点赞数: ' +  item.eq(i).find('.content .entry-left .zm-item-vote-count').text() +
        '  作者: ' + item.eq(i).find('.content .entry-meta .author').text() + '(' + item.eq(i).find('.content .entry-meta .bio').text() + ')',
        arg: item.eq(i).find('.content .answer link').attr('href')
      })
    }
    console.log(JSON.stringify({items: result_array}))
  })
})