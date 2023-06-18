export default class Calculation {

    constructor(title, date, id) {
        this.title = title;
        this.date = date;
        this.isActive = true;
        this.id = id;
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

    getId() {
        return this.id;
    }

    setIsActiveFalse() {
        this.isActive = false;
    }

    setIsActiveTrue() {
        this.isActive = true;
    }
}