const sharp = require("sharp");
/**
 * Converts RGB to ANSI 256 color
 * @param {number} r Red
 * @param {number} g Green
 * @param {number} b Blue
 * @returns {number} The ANSI color code
 * @example
 * rgbToAnsi256(255, 255, 255);
 */
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
/**
 * Returns a console.log-able string of the image
 * @param {(Buffer|String)} img The image to render, as a Buffer or a file path
 * @returns {Promise<String>} The image, as a string
 * @example
 * renderImage("image.png").then(console.log);
 */
async function renderImage(img) {
    const {data} = await sharp(img)
        .resize(process.stdout.columns, process.stdout.rows, {
            fit: "contain",
        })
        .raw()
        .toBuffer({ resolveWithObject: true })

    const pixels = [];
    for (let i = 0; i < data.length; i += 3) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        pixels.push(rgbToAnsi256(red, green, blue));
    }
    return pixels.map((item) => `\x1B[38;5;${item}m\u2588\x1B[0;00m`).join("");
}

// Est Time: 15ms
module.exports = renderImage
module.exports.rgbToAnsi256 = rgbToAnsi256