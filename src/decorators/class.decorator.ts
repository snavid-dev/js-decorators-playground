import 'reflect-metadata'

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

            const start = Date.now();
            console.log(start);

            const result = originalMethod.apply(this, args);

            const end = Date.now();
            console.log(end)

            console.log(`Method ${propertyKey} executed in ${end - start} ms`);
            return result;
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


export const ROLE_KEY = 'role';

export function Role(role: string) {
    return function (
        target: Object,
        propertyKey: string,
    ) {
        Reflect.defineMetadata(ROLE_KEY, role, target, propertyKey);
    }
}


class SecureCalculator {
    @Role('admin')
    add(a: number, b: number): number {
        return a + b;
    }

    @Role('user')
    subtract(a: number, b: number): number {
        return a - b;
    }

    @Role('admin')
    multiply(a: number, b: number): number {
        return a * b;
    }
}

const role = Reflect.getMetadata('role', SecureCalculator.prototype, 'add');
console.log(`Role required to access add method: ${role}`);


function scanClasses(target: any) {
    const proto = target.prototype;

    Object.getOwnPropertyNames(proto).forEach(name => {
        const role = Reflect.getMetadata(ROLE_KEY, proto, name);
        if (role) {
            console.log(`Method ${name} requires role: ${role}`)
        }

    })
}


scanClasses(SecureCalculator)