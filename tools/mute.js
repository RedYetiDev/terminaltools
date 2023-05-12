/**
 * Mute class to mute stdout.
 * @class
 */
class Mute {
    /**
     * @constructor
     */
    constructor() {
        // Use a bound version of the original `process.stdout.write()` method to avoid issues with `this` context.
        this.originalWrite = process.stdout.write.bind(process.stdout);
        this.output = '';
        this.muted = false;
    }
    /**
     * Mute stdout.
     * @example
     * const mute = new Mute();
     * mute.mute();
     */
    mute() {
        if (!this.muted) {
            this.muted = true;
            const self = this;
            process.stdout.write = function (chunk, encoding, callback) {
                if (!self.muted) {
                    self.originalWrite(chunk, encoding, callback);
                }
                self.output += chunk;
                if (callback) {
                    callback();
                }
                return true;
            };
        }
    }
    /**
     * Unmute stdout.
     * @example
     * const mute = new Mute();
     * mute.unmute();
     */
    unmute() {
        if (this.muted) {
            this.muted = false;
            process.stdout.write = this.originalWrite;
        }
    }
    /**
     * Clears the accumulated output.
     * @example
     * const mute = new Mute();
     * mute.clearOutput();
     */
    clearOutput() {
        this.output = '';
    }
    /**
     * Gets the accumulated output.
     * @returns {string}
     * @example
     * const mute = new Mute();
    */
    getOutput() {
        return this.output;
    }
}

module.exports = Mute;