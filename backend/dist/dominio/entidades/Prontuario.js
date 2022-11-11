"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prontuario = void 0;
class Prontuario {
    constructor(date, time, parecer) {
        this.date = date;
        this.time = time;
        this.parecer = parecer;
    }
    /**
     * Getters
     */
    getDate() {
        return this.date;
    }
    getTime() {
        return this.time;
    }
    getParecer() {
        return this.parecer;
    }
    /**
     * Setters
     */
    setDate(date) {
        this.date = date;
    }
    setTime(time) {
        this.time = time;
    }
    setParecer(parecer) {
        this.parecer = parecer;
    }
}
exports.Prontuario = Prontuario;
