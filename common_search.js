// 1 - 知乎; 2 - 淘宝; 3 - 掘金; 4 - SegmentFault; 5 - 简书; 6 - 博客园; 7 - Github
var number = process.argv[2]
var keyword = process.argv[3]
var https = require('https')
var path = require('path')
var content = ''

console.error(keyword)

if (number === '1') {
  var options = {
      host: 'www.zhihu.com',
      path: '/autocomplete?token='+encodeURI(keyword)
  }
  var url = 'https://www.zhihu.com/'
  https.get(options, function(res) {
    res.on('data', (data) => {
      content += data
    }).on('end', function() {
      var jsonContent = JSON.parse(content)[0]
      var result_array = []
      for(var i = 1; i < jsonContent.length - 2; i++ ){
        var type = jsonContent[i][0]
        switch (type) {
          case 'topic':
            result_array.push({
              title: jsonContent[i][1],
              subtitle: ' 【话题】 ' + jsonContent[i][6] + '个精华问答',
              arg: url + type + '/' + jsonContent[i][2],
              // icon: jsonContent[i][3].replace('_s', '_m'),
            })
            break
          case 'people':
            result_array.push({
              title: jsonContent[i][1],
              subtitle: ' 【用户】 ' + jsonContent[i][5],
              arg: url + type + '/' + jsonContent[i][2],
              // icon: jsonContent[i][3].replace('_s', '_m'),
            })
            break
          case 'question':
             result_array.push({
              title: jsonContent[i][1],
              subtitle: ' 【内容】 ' + jsonContent[i][4] + '个回答',
              arg: url + type + '/' + jsonContent[i][3],
              // icon: path.dirname(__dirname) + '/0A1F8331-941F-436E-B246-33278755D60A.png',
            })
            break
        }
      }
      content = ''
      console.log(JSON.stringify({
        items: result_array
      }))
    })
  })
} else if (number === '2') {
  var options = {
    host: 'suggest.taobao.com',
    path: '/sug?q='+encodeURI(keyword)
  }
  var url = 'https://s.taobao.com/search?q='
  var aaaa = 'E8F85589-F67A-4DC4-A472-E781462F41BF.png'
  https.get(options, function(res) {
    res.on('data', (data) => {
      content += data
    }).on('end', function() {
      var jsonContent = JSON.parse(content) && JSON.parse(content).result
      var result_array = []
      for(var i = 1; i < jsonContent.length; i++ ){
        result_array.push({
          title: jsonContent[i][0],
          subtitle: ' 共搜索到 ' + jsonContent[i][1] + ' 个相关物品',
          arg: url + jsonContent[i][0],
          icon: aaaa,
        })
      }
      console.log(JSON.stringify({
        items: result_array
      }))
    })
  })
}