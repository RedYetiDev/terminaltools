const delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
// Matrix
var domatrix;
async function matrix(letters=null) {
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
    var letter = letters[Math.floor(Math.random() * letters.length)] || Math.floor(Math.random() * 2)
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

// Snowing

var C = process.stdout.columns
var a = [];
var dosnow;
async function snow() {
  dosnow = true
  process.stdout.write("\033[2J")
  while (dosnow == true) {
    a[Math.floor(Math.random() * C)] = 0;
    a.forEach(function(o, x) {
      if (o != undefined) {
        a[x]++;
        process.stdout.write("\033[" + o + ";" + x + "H \033[" + a[x] + ";" + x + "H❃ \033[0;0H")
      }
    });
    await delay(100)
  }
}

function rainbow(message) {
  var c = [
    30, 31, 32, 33, 34, 35,
    36, 37, 90, 91, 92, 93,
    94, 95, 96, 97
  ]
  var m = [];
  message.split('').forEach(l => {
    color = c[Math.floor(Math.random() * c.length)]
    m.push("\033[" + color + "m" + l + "\033[0m")
  })
  console.log(m.join(''))
};
module.exports.snow = snow
module.exports.matrix = matrix
module.exports = {
  stop: () => {
    dosnow = false
    domatrix = false
  },
  snow: snow,
  matrix: matrix,
  rainbow: rainbow
}