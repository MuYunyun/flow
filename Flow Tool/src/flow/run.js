const { exec, execSync } = require('child_process')

const argv = process.argv
const { name, type } = JSON.parse(argv[2])

const codePath = process.env.codePath
const openPath = process.env.openPath

switch (type) {
  case 'code':
    exec(`/usr/local/bin/code ~/${codePath}/${name}`)
    break;
  case 'open':
    const remoteUrl = execSync(`cd ~/${openPath}/${name} && echo "$(git config --get remote.origin.url)"`).toString()
    // 将 gitlab@xx.xx.xx:demo.git 转化为 http://xx.xx.xx/demo.git
    const result = remoteUrl
      .replace(/:(?!\/)/g, '/') // 使用 ?!\/ 避免 https://xxx 中的 : 被转化为 /。
      .replace('gitlab@', 'http://')

    console.log(result)
    break;
  default:
}
