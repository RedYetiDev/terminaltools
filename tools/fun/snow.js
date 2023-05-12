/** @class */
class Snowfall {
    static #isRunning = false;
    /**
     * Start the snowfall
     * @static
     * @example
     * Snowfall.start();
     */
    static start() {
        this.#start();
    }
    static async #start() {
        if (this.#isRunning) return;

        this.#isRunning = true;
        process.stdout.write("\x1B[2J");
        const snowflakes = [];
        while (this.#isRunning) {
            const randomColumn = Math.floor(Math.random() * process.stdout.columns);
            snowflakes[randomColumn] = 0;

            snowflakes.forEach(function (height, column) {
                if (height != undefined) {
                    const newHeight = height + 1;
                    process.stdout.write(`\x1B[${height};${column}H \x1B[${newHeight};${column}H❃ \x1B[0;0H`);
                    snowflakes[column] = newHeight;
                }
            });

            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    /**
     * Stop the snowfall
     * @static
     * @example
     * Snowfall.stop();
     */
    static stop() {
        this.#isRunning = false;
        process.stdout.write("\x1B[2J");
    }
}

module.exports = Snowfall;