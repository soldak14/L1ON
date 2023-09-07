export class LogService {

    constructor() {
    }

    print(message?: any, ...optionalParams: any[]): void {
        console.log(message, ...optionalParams);
    }
}