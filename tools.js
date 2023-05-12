const video = require("./tools/video.js");
const mute = require("./tools/mute.js");
const image = require("./tools/image.js");
const banner = require("./tools/banner.js");
const fun_matrix = require("./tools/fun/matrix.js");
const fun_snow = require("./tools/fun/snow.js");
const fun_rainbow = require("./tools/fun/other.js");

module.exports = {
    renderVideo: video,
    Mute: mute,
    renderImage: image,
    Banner: banner,
    fun: {
        Matrix: fun_matrix,
        Snowfall: fun_snow,
        Rainbow: fun_rainbow
    }
}