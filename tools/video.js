var ffmpeg = require("ffmpeg")
var image = require("./image")
var fs = require("fs")
var path = require("path")
var sec;
var p = process;
const delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}
async function framify(video) {
  return new Promise(async(resolve, reject) => {
  await fs.rmdirSync("frames", { recursive: true });
  await fs.mkdirSync("frames");
  try {
          var process = new ffmpeg(video);
          process.then(function (video) {
              sec = video.metadata.seconds
              video.setVideoSize(p.stdout.columns + "x" + p.stdout.rows, true, false)
              video.fnExtractFrameToJPG("frames", {
                  every_n_frames : 1
              }, function() {
                return resolve("Framified")
              })
          }, function (err) {
              reject('Error: ' + err);
          });
      } catch (e) {
          reject(e.code);
          reject(e.msg);
      }
    })
}
async function render() {
  return new Promise(async(resolve, reject) => {
    var frames = await fs.readdirSync("frames")
    var fn = frames[0].split(/_\d+.jpg/)[0] + "_"
    frames.sort((a, b) => parseInt(a.split(fn)[1].split(".jpg")) - parseInt(b.split(fn)[1].split(".jpg")));
    frames.forEach((item, i) => {
      frames[i] = path.join("frames", item)
    });
    for (var i in frames) {
      var frame = await image(frames[i])
      console.log(frame)
      await delay(30)
    }
    return resolve("Rendered")
  })
}
async function full(video) {
  return new Promise((resolve, reject) => {
    await framify(video)
    await render()
  })
}
module.exports.render = render
module.exports.framify = framify
module.exports.runall = full
