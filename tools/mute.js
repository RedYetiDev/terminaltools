var write = process.stdout.write
function mute(func) {
  process.stdout.write = function() {}
  func()
  process.stdout.write = write
  return true
}
module.exports.mute = mute
module.exports.write = write
