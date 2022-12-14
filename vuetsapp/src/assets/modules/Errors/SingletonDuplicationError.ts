export default 
class SingletonDuplicationError extends Error {
    constructor(message : string) {
        super("Singleton duplication: " + message);
    }
}