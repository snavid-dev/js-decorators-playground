// Example of a simple class decorator that logs when a class is created
function simpleLogger(constructor: Function) {
    console.log(`Class ${constructor.name} has been created.`);
}

@simpleLogger
class UserService {
}


