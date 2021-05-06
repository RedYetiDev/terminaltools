const delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}
const image = require("./image")
var ansiEscapes = require('ansi-escapes');
class Line {
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
class Pinwheel {
  constructor() {
    this.loader = null;
    this.rl = null
  }
  async start() {
    this.rl = readline.createInterface({
      terminal: true,
      input: process.stdin,
      output: process.stdout
    })
    var rl = this.rl
    var l1 = await image(__dirname + "/loaders/pinwheel/pinwheel_1.png")
    var l2 = await image(__dirname + "/loaders/pinwheel/pinwheel_2.png")
    var l3 = await image(__dirname + "/loaders/pinwheel/pinwheel_3.png")
    var l4 = await image(__dirname + "/loaders/pinwheel/pinwheel_4.png")
    this.loader = setInterval(async function () {
      rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log(l1)
      await delay(200)
      rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log(l2)
      await delay(200)
      rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log(l3)
      await delay(200)
      rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log(l4)
    }, (600));
  }
  end() {
    clearInterval(this.loader)
    this.rl.output.end();
    this.rl.pause();
    this.rl.close();
  }
}
class Dots {
  constructor() {
    this.loader = null;
    this.rl = null
  }
  async start() {
    this.rl = readline.createInterface({
      terminal: true,
      input: process.stdin,
      output: process.stdout
    })
    var rl = this.rl
    this.loader = setInterval(async function () {
      rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log("o");
      await delay(200)
      rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log("  o\no o");
      await delay(200)
      rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log("    o\n    o\no o o");
      await delay(200)
      rl.write(ansiEscapes.eraseLines(process.stdout.rows))
      console.log("      o\n      o\n      o\no o o o");
      await delay(200)
    }, (800))
  }
  end() {
    clearInterval(this.loader)
    this.rl.output.end();
    this.rl.pause();
    this.rl.close();
  }
}
class Colorful {
  async #_start(item) {
    for (var i = 0; i < (process.stdout.columns / 2); i++) {
      if (!this.isLoading) return;
      process.stdout.write(item)
      await delay(100)
    }
    process.stdout.write("\u001B[F")
    process.stdout.write("\u001B[E")
    return;
  }

  async start(items) {
    if (!items instanceof Array) throw new Error("Items must be an instance of array")

    this.isLoading = true
    while (this.isLoading) {
      for (var i = 0; i < items.length; i++) {
        await this.#_start(items[i])
        if (!this.isLoading) break;
      }
    }
  }
  end() {
    this.isLoading = false
  }
  async loadWithDefault() {
    await load(["🟩", "🟨", "🟧", "🟥"])
  }
}

module.exports.line = Line
module.exports.pinwheel = Pinwheel
module.exports.dots = Dots
module.exports.colorful = Colorful
