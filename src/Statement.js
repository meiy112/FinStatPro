export default class Statement {

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    getName() {
        return this.name;
    }

    getValue() {
        return this.value;
    }

    changeName(name) {
        this.name = name;
    }

    changeValue(value) {
        this.value = value;
    }
}