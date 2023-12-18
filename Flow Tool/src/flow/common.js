const fs = require("fs")
const path = require("path")
const { promisify } = require("util")

const readdirAsync = promisify(fs.readdir)
const keyword = process.argv[2]
// 类型。当前存在 open、code 类型，执行 open 命令打开 gitlab/github 对应项目；执行 code 使用 vscode 打开对应项目；
const type = process.argv[3]
const homedir = require("os").homedir()

let operatePath = ''

if (type === 'code') {
  operatePath = process.env.codePath
} else if (type === 'open') {
  operatePath = process.env.openPath
}

const projectDir = path.join(homedir, operatePath)

;(async function () {
  const items = (await readdirAsync(projectDir))
    .filter(name => name.includes(keyword))
    .map(name => ({
      title: name,
      // 按回车后，alfred 会把变量 arg 传递给下个步骤。此处使用 JSON.stringify 避免 alfred 会产生多余的回车 \n 字段，以及造成流水线节点无法解析对象中 key 的问题。
      arg: JSON.stringify({
        name,
        type
      })
    }))
  console.log(
    JSON.stringify({
      items
    })
  )
})()
