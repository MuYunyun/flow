const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdirAsync = promisify(fs.readdir);
const keyword = process.argv[2];
const homedir = require("os").homedir();
const projectDir = path.join(homedir, "Pinduoduo");

(async function () {
  const items = (await readdirAsync(projectDir))
    .filter(name => !name.startsWith("."))
    .filter(name => name.includes(keyword))
    .map(name => ({
      title: name,
      arg: name // 按回车后，alfred 会把这个变量传递给下个步骤
    }));

  console.log(
    JSON.stringify({
      items
    })
  );
})();
