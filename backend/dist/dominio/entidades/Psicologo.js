"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Psicologo = void 0;
const User_1 = require("../super-classes/User");
class Psicologo extends User_1.User {
    constructor(id, name, cpf, phone, email, address, crp, workDays, especialidade) {
        super(id, name, cpf, phone, email, address);
        this.crp = crp;
        this.workDays = workDays;
        this.especialidade = especialidade;
        this.prontuarios = new Map();
    }
    /**
     * Getters
     */
    getCrp() {
        return this.crp;
    }
    getWorkDays() {
        return this.workDays;
    }
    getEspecialidade() {
        return this.especialidade;
    }
    getProntuarios() {
        return this.prontuarios;
    }
    /**
     * Setters
     */
    setCrp(crp) {
        this.crp = crp;
    }
    setWorkDays(workDays) {
        this.workDays = workDays;
    }
}
exports.Psicologo = Psicologo;
