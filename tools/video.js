var ffmpeg = require("ffmpeg")
var fs = require("fs")
var path = require("path")
var specialrender = require("./lib/specialimage")
var exec = require("util").promisify(require("child_process").exec)
var fps;
const delay = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}
// Video Rendering
async function framify(video) {
  return new Promise(async(resolve, reject) => {
  await fs.rmdirSync("frames", { recursive: true });
  await fs.mkdirSync("frames");
  try {
          var process = new ffmpeg(video);
          process.then(function (video) {
              fps = video.metadata.fps
              console.log("Framifying...")
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
async function render(frames) {
  fps = fps || frames || 30;
  return new Promise(async(resolve, reject) => {
    var frames = await fs.readdirSync("frames")
    var fn = frames[0].split(/_\d+.jpg/)[0] + "_"
    frames.sort((a, b) => parseInt(a.split(fn)[1].split(".jpg")) - parseInt(b.split(fn)[1].split(".jpg")));
    frames.forEach((item, i) => {
      frames[i] = path.join("frames", item)
    });
    for (var i in frames) {
      var frame = await specialrender(frames[i])
      process.stdout.write("\033[0;0H" + frame)
      await delay(fps)
    }
    return resolve("Rendered")
  })
}
async function advrender(frames) {
  fps = fps || frames || 30;
  var pf = [];
  return new Promise(async(resolve, reject) => {
    var frames = await fs.readdirSync("frames")
    var fn = frames[0].split(/_\d+.jpg/)[0] + "_"
    frames.sort((a, b) => parseInt(a.split(fn)[1].split(".jpg")) - parseInt(b.split(fn)[1].split(".jpg")));
    frames.forEach((item, i) => {
      frames[i] = path.join("frames", item)
    });
    process.stdout.write("\033[" + process.stdout.columns + "Prerendering Frames")
    for (var i in frames) {
      var frame = await specialrender(frames[i])
      pf.push(frame)
      process.stdout.write("\033[" + process.stdout.columns + "D" + i + " out of " + frames.length + " frames prepared")
    }
    process.stdout.write("\033[" + process.stdout.columns + "DRendering...")
    for (var i in pf) {
      process.stdout.write("\033[0;0H" + pf[i])
      await delay(fps)
    }
    return resolve("Rendered")
  })
}
async function buffer(video, lpf) {
  if (!video) {
    throw Error("You must specify a video")
  }
  if (!lpf) {
    console.warn("lpf is not specifed, deaulting to 100.");
  }
  var framebuffers = []
  var framenum = []
  var {stdout} = await exec(`ffmpeg -i ${video} -f null /dev/null 2>&1| grep "frame=  "`)
  framenum.length = parseInt(stdout.split("frame=  ")[1].split(" fps")[0])
  framenum.fill("",0,(framenum.length - 1))
  for (var index in framenum) {
    if (index + 1 < framenum.length) {
      var { stdout } = await exec(`ffmpeg -i ${video} -filter:v select="gte(n\\,${index + 1})" -vframes 1 -vcodec png -f rawvideo pipe:1`, {
        encoding: "arraybuffer",
      })
      framebuffers.push(stdout)
    }
  }
  for (var i in framebuffers) {
    var frame = await specialrender(framebuffers[i])
    process.stdout.write("\033[0;0H" + frame)
    await delay(lpf || 100)
  }
}
// Full
async function full(video) {
  return new Promise(async(resolve, reject) => {
    await framify(video)
    await render()
  })
}
module.exports.render = render
module.exports.advrender = advrender
module.exports.framify = framify
module.exports.runall = full
module.exports.buffer = buffer
