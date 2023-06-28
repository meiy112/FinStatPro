import Spreadsheet from "./Spreadsheet.js";

export default class Calculation {

    constructor(title, date, id) {
        this.title = title;
        this.date = date;
        this.isActive = true;
        this.id = id;
        this.spreadsheet = new Spreadsheet();
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

    getSpreadsheet() {
        return this.spreadsheet;
    }

    setIsActiveFalse() {
        this.isActive = false;
    }

    setIsActiveTrue() {
        this.isActive = true;
    }
}