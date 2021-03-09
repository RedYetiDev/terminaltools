const delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}
class Loader {
  constructor() {
    this.loader = null;
  }
  async start() {
    var num = 1;
    this.loader = setInterval(async function () {
      process.stdout.write("\x1b[43m"  + " ".repeat(num) + "\x1b[0m\r")
      await delay(100)
      if (num == process.stdout.columns) {
        process.stdout.write(" ".repeat(process.stdout.columns) + "\r")
        num = 1;
      } else {
        num += 1
      }
    }, (100));
  }
  end() {
    clearInterval(this.loader)
  }
}
module.exports = Loader
