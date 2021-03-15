var fs = require("fs")
var path = require("path")
var { cwd } = require("process")
async function minify(files) {
  var joined = []
  await files.forEach(async(item, i) => {
    if (item[0] != "/") {
      var filepath = path.join(cwd(), item)
      var filedata = await fs.readFileSync(filepath, "utf8")
      joined.push(filedata)
    } else {
      joined.push(item)
    }
  });
  joined = joined.join("\n").replaceAll(/([^{;,\[])(?!\n])\n/g,"$1;\n").replaceAll(/(?<!var|let|const|async|function|await)\s(?=([^"]*"[^"]*")*[^"]*$)/g,"").replaceAll(/\t(?=([^"]*"[^"]*")*[^"]*$)/g,"")
  return joined
}
module.exports = minify
