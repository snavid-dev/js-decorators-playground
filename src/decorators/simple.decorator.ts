function logWrapper(fn: Function) {
    return function (...args: any[]) {
        console.log(`Calling function ${fn.name} with arguments`, args)
        return fn(...args);
    }
}


function add(a: number, b: number): number {
    return a + b;
}

const loggedAdd = logWrapper(add);

loggedAdd(2, 3);