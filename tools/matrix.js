const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  }
)
}
var domatrix;
async function start() {
  domatrix = true
  var lines = process.stdout.rows
  var columns = process.stdout.columns
  console.log("\033[1;40m")
  process.stdout.write("\033[2J")
  var cols = [];
  while (domatrix == true) {
    var line = 0
    await delay(100)
    var random_col = Math.floor(Math.random() * columns)
    var letter= Math.floor(Math.random() * 2)
    cols[random_col] = 0;
    for (col in cols) {
      var rnum = Math.floor(Math.random() * 20);
      if (cols[col] < 0) {
        line =- cols[col];
        cols[col] = cols[col] - 1;
        var subline = -cols[col] + 1
        process.stdout.write("\033[" + line + ";" + col + "H ")
        process.stdout.write("\033[\n;" + col + "H \033[0;0H")
        if (subline >= lines) {
          cols[col] = 0;
        } else if (rnum < 1) {
          cols[col] = 0
        }
      } else {
        line = cols[col];
        cols[col] = cols[col]+1;
        if (rnum < 3) {
          process.stdout.write("\033[" + line + ";" + col + "H\033[1;32m" + letter + "\033[0m")
        } else {
          process.stdout.write("\033[" + line + ";" + col + "H\033[2;32m" + letter + "\033[0m")
        }
        process.stdout.write("\033[" + cols[col] + ";" + col + "H\033[37m" + letter + "\033[0;0H\033[0m")
        if (cols[col] >= lines) {
          if (rnum < 2) {
            cols[col] = 0
          } else {
            cols[col] = -1;
          }
        }
      }
    }
  }
}

module.exports.start = start
module.exports.stop = () => {domatrix = false}
