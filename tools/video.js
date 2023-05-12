const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
/**
 * Convert a video to ASCII
 * @param {String} videoPath The file path to the video
 * @returns {Promise<String[]>} The video, as an array of frames
 * @example
 * renderVideo("video.mp4").then(console.log);
 */
async function renderVideo(videoPath) {
    const ffmpegProcess = await cp.spawnSync(ffmpeg, [
        '-i', videoPath,
        '-f', 'image2pipe',
        '-pix_fmt', 'rgb24',
        '-s', `${process.stdout.columns}x${process.stdout.rows}`,
        '-vcodec', 'rawvideo', '-'
    ]);

    const bytesPerFrame = process.stdout.columns * process.stdout.rows * 3;

    const frames = ffmpegProcess.stdout;
    const mappedFrames = [];

    for (let i = 0; i < frames.length; i += bytesPerFrame) {
        const frame = frames.subarray(i, i + bytesPerFrame);
        let mFrame = [];
        for (let j = 0; j < frame.length; j += 3) {
            const r = frame[j];
            const g = frame[j + 1];
            const b = frame[j + 2];
            mFrame.push(`\x1B[38;2;${r};${g};${b}m\u2588`);
        }
        mappedFrames.push(mFrame.join(''));
    }

    return mappedFrames;
}

module.exports = renderVideo;