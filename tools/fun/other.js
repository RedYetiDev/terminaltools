/**
 * Prints a message in rainbow colors
 * @param {String} message The message to print
 * @example
 * rainbow("Hello, world!");
 */
function rainbow(message) {
    var c = [
        30, 31, 32, 33, 34, 35,
        36, 37, 90, 91, 92, 93,
        94, 95, 96, 97
    ]
    var m = [];
    message.split('').forEach(l => {
        color = c[Math.floor(Math.random() * c.length)]
        m.push(`\x1B[${color}m${l}\x1B[0m`)
    })
    console.log(m.join(''))
};

module.exports = rainbow;