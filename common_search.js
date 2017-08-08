// 1 - 知乎; 2 - 淘宝; 3 - 掘金; 4 - Github
var number = process.argv[2]
var keyword = process.argv[3]
var https = require('https')
var path = require('path')

var join = path.join
var content = ''

console.error(keyword)

if (number === '1') {
  var options = {
      host: 'www.zhihu.com',
      path: '/autocomplete?token='+encodeURI(keyword)
  }
  var url = 'https://www.zhihu.com/'
  https.get(options, function(res) {
    res.on('data', (chunk) => {
      content += chunk
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
              icon: {
                path: join(__dirname, '/0A1F8331-941F-436E-B246-33278755D60A.png'),
              }
            })
            break
          case 'people':
            result_array.push({
              title: jsonContent[i][1],
              subtitle: ' 【用户】 ' + jsonContent[i][5],
              arg: url + type + '/' + jsonContent[i][2],
              icon: {
                path: join(__dirname, '/0A1F8331-941F-436E-B246-33278755D60A.png'),
              }
            })
            break
          case 'question':
             result_array.push({
              title: jsonContent[i][1],
              subtitle: ' 【内容】 ' + jsonContent[i][4] + '个回答',
              arg: url + type + '/' + jsonContent[i][3],
              icon: {
                path: join(__dirname, '/0A1F8331-941F-436E-B246-33278755D60A.png'),
              }
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
    path: '/sug?code=utf-8&q='+encodeURI(keyword)
  }
  var url = 'https://s.taobao.com/search?q='
  https.get(options, function(res) {
    res.on('data', (chunk) => {
      content += chunk
    }).on('end', function() {
      var jsonContent = JSON.parse(content) && JSON.parse(content).result
      var result_array = []
      for(var i = 0; i < jsonContent.length; i++ ){
        result_array.push({
          title: jsonContent[i][0],
          subtitle: ' 共搜索到 ' + jsonContent[i][1] + ' 个相关物品',
          arg: url + jsonContent[i][0],
          icon: {
            path: join(__dirname, '/E8F85589-F67A-4DC4-A472-E781462F41BF.png'),
          },
        })
      }
      content = ''
      console.log(JSON.stringify({
        items: result_array
      }))
    })
  })
} else if (number === '3') {
  var options = {
    host: 'search-merger-ms.juejin.im',
    path: '/v1/search?query=' + encodeURI(keyword) + '&page=0&raw_result=false&src=web'
  }
  https.get(options, function (res) {
    res.on('data', (chunk) => {
      content += chunk
    }).on('end', function () {
      var jsonContent = JSON.parse(content) && JSON.parse(content).d
      var result_array = []
      for (var i = 0; i < jsonContent.length; i++) {
        if (jsonContent[i].user.jobTitle === '') {
          result_array.push({
            title: jsonContent[i].title,
            subtitle: '点赞数' + jsonContent[i].collectionCount + ' 作者: ' + jsonContent[i].user.username,
            arg: jsonContent[i].originalUrl,
            icon: {
              path: join(__dirname, '/17C80585-EC4F-498F-AB91-DBA6EBEA4C9D.png'),
            },
            mods: {
              cmd: {
                arg: jsonContent[i].originalUrl,
                subtitle: jsonContent[i].content
              }
            }
          })
        } else {
          result_array.push({
            title: jsonContent[i].title,
            subtitle: '点赞数' + jsonContent[i].collectionCount + ' 作者: ' + jsonContent[i].user.username + '(' + jsonContent[i].user.jobTitle + ')',
            arg: jsonContent[i].originalUrl,
            icon: {
              path: join(__dirname, '/17C80585-EC4F-498F-AB91-DBA6EBEA4C9D.png'),
            },
            mods: {
              cmd: {
                arg: jsonContent[i].originalUrl,
                subtitle: jsonContent[i].content
              }
            }
          })
        }
      }
      content = ''
      console.log(JSON.stringify({
        items: result_array
      }))
    })
  })
} else if (number === '4') {
  var options = {
    host: 'api.github.com',
    path: '/search/repositories?q=' + encodeURI(keyword) + '&sort=stars',
    headers: {'User-Agent': 'MuYunyun'}
  }
  https.get(options, function(res) {
    res.on('data', (chunk) => {
      content += chunk
    }).on('end', function() {
      var jsonContent = JSON.parse(content) && JSON.parse(content).items
      var result_array = []
      for (var i = 0; i < 9; i++) {
        result_array.push({
          title: jsonContent[i].name,
          subtitle: jsonContent[i].stargazers_count + ' Star ' + '(' + jsonContent[i].description + ')',
          arg: jsonContent[i].html_url,
          icon: {
            path: join(__dirname, '29EFA025-C5F1-468D-B065-59EF0C026D11.png')
          }
        })
      }
      content = ''
      console.log(JSON.stringify({
        items: result_array
      }))
    })
  })
}