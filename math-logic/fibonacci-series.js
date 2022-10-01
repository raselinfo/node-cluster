class FibonacciSeries {
    calculateFibonacciSeries(number) {
        let s = 0;
        if (number === 0) {
            return s
        }
        if (number === 1) {
            return s += 1
            return s
        }
        else {
            return this.calculateFibonacciSeries(number - 1) + this.calculateFibonacciSeries(number - 2)
        }
    }
}

module.exports = new FibonacciSeries()