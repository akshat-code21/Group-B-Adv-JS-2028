function myPromiseAll(items) {
    return new Promise((res, rej) => {
        if (!Array.isArray(items)) {
            throw new TypeError("Items is not array")
        }

        if (items.length === 0) {
            res([]);
        }

        let results = []
        let completedCount = 0;

        items.forEach((item) => {
            Promise.resolve(item).then((data) => {
                results.push(data)
                completedCount++;

                if (completedCount === items.length) {
                    res(results)
                }
            }).catch((error) => {
                rej(error)
            })
        })
    })
}

function myPromiseAny(items) {
    return new Promise((res, rej) => {
        if (!Array.isArray(items)) {
            return rej(new TypeError("Items is not an array"));
        }
        if (items.length === 0) {
            res([]);
        }

        const errors = []
        const errorCount = 0

        items.forEach((item) => {
            Promise.resolve(item)
                .then((data) => {
                    res(data)
                }).catch((error) => {
                    errorCount++;
                    errors.push(error)
                    if (errorCount === array.length) {
                        reject(new AggregateError(errors, 'All promises were rejected'));
                    }
                })
        })
    })
}

function myPromiseRace(items) {
    return new Promise((res, rej) => {
        if (!Array.isArray(items)) {
            return rej(new TypeError("Items is not an array"));
        }

        if (items.length === 0) {
            return;
        }

        items.forEach((item) => {
            Promise.resolve(item).then((value) => {
                res(value)
            }).catch((err) => {
                rej(err)
            })
        })
    })
}

function myPromiseAllSettled(items) {
    return new Promise((res, rej) => {
        if (!Array.isArray(items)) {
            return rej(new TypeError("Items is not an array"))
        }

        if (items.length === 0) {
            res([])
        }

        const results = []
        const completedCount = 0;

        items.forEach((item) => {
            Promise.resolve(item).then((value) => {
                results.push({ status: "fulfilled", value: value })
            }).catch((err) => {
                results.push({ status: "rejected", reason: err })
            }).finally(() => {
                completedCount++;
                if (completedCount === items.length) {
                    resolve(results)
                }
            })
        })
    })
}

Function.prototype.myCall = function (context, ...args) {
    context = context | globalThis

    const uniqueKey = Symbol("fn")
    context[uniqueKey] = this


    const result = context[uniqueKey](...args);

    delete context[uniqueKey]

    return result
}

Function.prototype.myApply = function (ctx, argsArray) {
    ctx = ctx || globalThis
    const args = argsArray || []

    const uniqueKey = Symbol("fn")
    ctx[uniqueKey] = this

    const result = ctx[uniqueKey](...args)

    delete ctx[uniqueKey]

    return result
}

Function.prototype.myBind = function (ctx, ...outerArgs) {
    const originalFn = this

    return (...innerArgs) => {
        return originalFn.apply(ctx, [...outerArgs, ...innerArgs])
    }
}