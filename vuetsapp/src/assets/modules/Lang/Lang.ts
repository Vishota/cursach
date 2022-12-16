import SingletonDuplicationError from "../Errors/SingletonDuplicationError";

class Lang {
    private static _instance : Lang;
    public static get instance() {
        if(this._instance === undefined)
            this._instance = new Lang();
        return this._instance;
    }
    private constructor() {
        if(Lang._instance !== undefined)
            throw new SingletonDuplicationError('"Lang" duplication')
    }
    get():any {
        return {
            yes: "Да",
            no: "Нет",
            tosignin: "Войти",
            tosignup: "Зарегистрироваться",
            signin: "Вход",
            signup: "Регистрация",
            login: "Логин",
            password: "Пароль",
            passwordrepeat: "Пароль, еще раз",
            change: "Выбрать",
            theme: "Тема",
            tomessage: "Написать",
            toreport: "Пожаловаться",
            city: "Город",
            features: new Map<string, string>([['somefeature','Какая-то характеристика'], ['anotherfeature', 'Другая характеристика'], ['boolfeature', 'Характеристика типа да/нет']])
        }
    }
}

export default Lang.instance;