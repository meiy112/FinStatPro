import Statement from "./Statement.js";

export default class Spreadsheet {

    constructor() {
        this.statements = [];
        this.hasNetRevenue = false;
        this.hasCostOfGoodsSold = false;
        this.hasGrossProfit = false;
    }

    addStatement(statement) {
        this.statements.add(statement);
    }

    updateStatements() {
        for (var i = 0; i < this.statements.length; i++) {
            let statement = statements[i];

            if (statement.getName() === "net revenue") {
                this.hasNetRevenue = true;
            } else if (statement.getName() === "cost of goods sold") {
                this.hasCostOfGoodsSold = true;
            } else if (statement.getName() === "gross profit" && this.hasNetRevenue && this.hasCostOfGoodsSold) {
                this.hasGrossProfit = true;
                this.CalculateGrossProfit(statement);
            }
        }
    }

    // ===== CALCULATE =====
    CalculateGrossProfit(statement) {
        let netRevenue = this.getValue("net revenue");
        let costOfGoodsSold = this.getValue("cost of goods sold");

        let newValue = netRevenue - costOfGoodsSold;

        statement.changeValue(newValue);
    }

    // ===== MISC =====
    getValue(name) {
        for (var i = 0; i < this.statements.length; i++) {
            let statement = this.statements[i];
            let value = null;

            if (statement.getName() === name) {
                value = statement.getValue;
            }

            return value;
        }
    }
}