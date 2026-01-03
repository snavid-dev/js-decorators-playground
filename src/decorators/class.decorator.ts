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