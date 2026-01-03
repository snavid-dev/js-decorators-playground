// Example of a simple class decorator that logs when a class is created
function simpleLogger(constructor: Function) {
    console.log(`Class ${constructor.name} has been created.`);
}

@simpleLogger
class UserService {
}


// Example of a parameterized class decorator
function Logger(prefix: string) {
    return function (constructor: Function) {
        console.log(`${prefix} - Class ${constructor.name} has been created.`);
    }
}

@Logger('INFO')
class ProductService {

}

// Example of a method within a class

function logMethod() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            console.log(`method${propertyKey} called with args: ${JSON.stringify(args)}`);
            return originalMethod.apply(this, args);
        }
    }
}

class Caclulator {
    @logMethod()
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Caclulator();
calc.add(2, 3);