const image = require("./tools/image")
const video = require("./tools/video")
const loader = require("./tools/loader")
const server = require("./tools/server")
const minify = require("./tools/minify")
const mute = require("./tools/mute")
const fun = require("./tools/fun")
const banner = require("./tools/banner")

module.exports.image = image
module.exports.loader = loader
module.exports.video = video
module.exports.server = server
module.exports.minify = minify
module.exports.muter = mute
module.exports.fun = fun
module.exports.banner = banner
module.exports.delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}
