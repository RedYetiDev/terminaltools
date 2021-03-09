const delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}
const readline = require("readline")
const Jimp = require("jimp")
function rgbToAnsi256(r, g, b) {
    if (r === g && g === b) {
        if (r < 8) {
            return 16;
        }
        if (r > 248) {
            return 231;
        }
        return Math.round(((r - 8) / 247) * 24) + 232;
    }
    var ansi = 16
        + (36 * Math.round(r / 255 * 5))
        + (6 * Math.round(g / 255 * 5))
        + Math.round(b / 255 * 5);
    return ansi;
}
async function renderimage(img) {
  return new Promise((resolve, reject) => {
    var pixels = [];
    var result = "";
    Jimp.read(img, (err, image) => {
      if (err) throw err;
      image = image.resize(process.stdout.columns, process.stdout.rows)
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        var red = this.bitmap.data[idx + 0];
        var green = this.bitmap.data[idx + 1];
        var blue = this.bitmap.data[idx + 2];
        pixels.push(rgbToAnsi256(red, green, blue))
      });
      pixels.forEach((item, i) => {
        result = result + "\033[48;5;" + item + "m \033[0;00m"
      });
      return resolve(result)
    })
  })
}
module.exports = renderimage
