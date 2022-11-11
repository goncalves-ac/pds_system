"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secretarias = void 0;
const User_1 = require("./super-classes/User");
class Secretarias extends User_1.User {
    constructor(id, name, cpf, phone, email, address, workDays, workHours) {
        super(id, name, cpf, phone, email, address);
        this.workDays = workDays;
        this.workHours = workHours;
    }
    /**
     * Getters
     */
    getWorkDays() {
        return this.workDays;
    }
    getWorkHours() {
        return this.workHours;
    }
    /**
     * Setters
     */
    setWorkDays(workDays) {
        this.workDays = workDays;
    }
    setWorkHours(workHours) {
        this.workHours = workHours;
    }
}
exports.Secretarias = Secretarias;
