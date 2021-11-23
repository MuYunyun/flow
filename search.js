const item = process.argv[2]
const keyword = process.argv[3]
const https = require('https')
const path = require('path')

const { join } = path
let content = ''
let result_array = []

const options = {
  'zhihu': {
    host: 'www.zhihu.com',
    path: '/autocomplete?token=' + encodeURI(keyword),
    url: 'https://www.zhihu.com/'
  },
  'taobao': {
    host: 'suggest.taobao.com',
    path: '/sug?code=utf-8&q=' + encodeURI(keyword),
    url: 'https://s.taobao.com/search?q=',
  },
  // 'juejin': {
  //   host: 'search-merger-ms.juejin.im',
  //   path: '/v1/search?query=' + encodeURI(keyword) + '&page=0&raw_result=false&src=web'
  // },
  'jd': {
    host: 'dd-search.jd.com',
    path: '/?ver=2&key=' + encodeURI(keyword),
    headers: { 'Referer': 'https://www.jd.com/' },
    url: 'https://search.jd.com/Search?enc=utf-8&keyword='
  },
  'juejin': {
    hostname: 'web-api.juejin.im',
    method: 'post',
    path: '/query',
    headers: {
      'Content-Type': 'application/json',
      'X-Agent': 'Juejin/Web',
    }
  },
  'github': {
    host: 'api.github.com',
    path: '/search/repositories?q=' + encodeURI(keyword) + '&sort=stars',
    headers: { 'User-Agent': 'MuYunyun' }
  }
}[item]

function getData(handleDataFn) {
  https.get(options, (res) => {
    res.on('data', (chunk) => {
      content += chunk
    }).on('end', () => {
      const jsonContent = JSON.parse(content)
      handleDataFn(jsonContent)
    })
  })
}

function getJueJin(handleDataFn) {
  const req = https.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      content += chunk;
    }).on('end', () => {
      const jsonContent = JSON.parse(content);
      handleDataFn(jsonContent);
    });
  });
  req.write(JSON.stringify({
    extensions: {
      query: { id: 'a53db5867466eddc50d16a38cfeb0890' },
    },
    operationName: '',
    query: '',
    variables: {
      after: '',
      first: 100,
      period: 'ALL',
      query: keyword,
      type: 'ARTICLE',
      order: 'POPULAR',
    },
  }));
  req.end();
}

function showItem(resultArray) {
  content = ''
  result_array = []
  console.log(JSON.stringify({
    items: resultArray
  }))
}

if (item === 'zhihu') {
  getData((jsonContent) => {
    const result = jsonContent[0]
    // console.log('result', result)
    const { url } = options
    for (let i = 1; i < result.length - 2; i++) {
      const type = result[i][0]
      switch (type) {
        case 'topic':
          result_array.push({
            title: result[i][1],
            subtitle: ` 【话题】 ${result[i][6]}个精华问答`,
            arg: `${url}${type}/${result[i][2]}`,
            icon: {
              path: join(__dirname, '/0A1F8331-941F-436E-B246-33278755D60A.png'),
            }
          })
          break
        case 'people':
          result_array.push({
            title: result[i][1],
            subtitle: ` 【用户】 ${result[i][5]}`,
            arg: `${url}${type}/${result[i][2]}`,
            icon: {
              path: join(__dirname, '/0A1F8331-941F-436E-B246-33278755D60A.png'),
            }
          })
          break
        case 'question':
          result_array.push({
            title: result[i][1],
            subtitle: ` 【内容】 ${result[i][5]}个回答`,
            arg: `${url}${type}/${result[i][3]}`,
            icon: {
              path: join(__dirname, '/0A1F8331-941F-436E-B246-33278755D60A.png'),
            }
          })
          break
        case 'article':
          result_array.push({
            title: result[i][1],
            subtitle: ` 【内容】 ${result[i][4]}次赞同`,
            arg: `https://zhuanlan.zhihu.com/p/${result[i][3]}`,
            icon: {
              path: join(__dirname, '/0A1F8331-941F-436E-B246-33278755D60A.png'),
            }
          })
          break
      }
    }
    showItem(result_array)
  })
} else if (item === 'taobao') {
  getData((jsonContent) => {
    const { result } = jsonContent
    for (let i = 0; i < result.length; i++) {
      result_array.push({
        title: result[i][0],
        subtitle: ` 共搜索到 ${result[i][1]} 个相关物品`,
        arg: `${options.url}${result[i][0]}`,
        icon: {
          path: join(__dirname, '/E8F85589-F67A-4DC4-A472-E781462F41BF.png'),
        },
      })
    }
    showItem(result_array)
  })
} else if (item === 'jd') {
  getData((jsonContent) => {
    for (let i = 0; i < jsonContent.length; i++) {
      result_array.push({
        title: jsonContent[i].keyword,
        arg: `${options.url}${jsonContent[i].keyword}`,
        icon: {
          path: join(__dirname, '/CF658493-2BBB-4571-A332-86BFBCCB5AFB.png'),
        },
      })
    }
    showItem(result_array)
  })
} else if (item === 'juejin') {
  getJueJin((jsonContent) => {
    const result = jsonContent.data.search.edges;
    for (let i = 0; i < result.length; i++) {
      const item = result[i].node.entity;
      const author = item.user;
      result_array.push({
        title: item.title,
        subtitle: `点赞数${item.collectionCount} 作者: ${author.username}${author.jobTitle ? `(${author.jobTitle})` : ''}`,
        arg: item.originalUrl,
        icon: {
          path: join(__dirname, '/17C80585-EC4F-498F-AB91-DBA6EBEA4C9D.png'),
        },
        mods: {
          cmd: {
            arg: item.originalUrl,
            subtitle: item.content,
          },
        },
      });
    }
    showItem(result_array);
  });
} else if (item === 'github') {
  getData((jsonContent) => {
    const result = jsonContent.items
    for (let i = 0; i < 9; i++) {
      result_array.push({
        title: result[i].name,
        subtitle: `${result[i].stargazers_count} Star (${result[i].description})`,
        arg: result[i].html_url,
        icon: {
          path: join(__dirname, '29EFA025-C5F1-468D-B065-59EF0C026D11.png')
        }
      })
    }
    showItem(result_array)
  })
}