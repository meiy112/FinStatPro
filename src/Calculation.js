export default class Calculation {

    constructor(title, date) {
        this.title = title;
        this.date = date;
        this.isActive = true;
    }

    getTitle() {
        return this.title;
    }

    getCalculationDate() {
        return this.date;
    }

    getIsActive() {
        return this.isActive;
    }

    toggleIsActive() {
        this.isActive === !this.isActive;
    }
}