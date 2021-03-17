var C = process.stdout.columns
var a = [];
const delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}
var snow;
async function start() {
  snow = true
  process.stdout.write("\033[2J")
  while (snow == true) {
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
module.exports.start = start
module.exports.stop = () => {snow = false}
