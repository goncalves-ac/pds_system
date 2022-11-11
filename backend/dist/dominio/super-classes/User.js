"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/**
 * Superclasse base para entidades.
 */
class User {
    constructor(id, nome, cpf, telefone, email, endereco) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
    }
    /**
     * Getters
     */
    getId() {
        return this.id;
    }
    getName() {
        return this.nome;
    }
    getCPF() {
        return this.cpf;
    }
    getPhone() {
        return this.telefone;
    }
    getEmail() {
        return this.email;
    }
    getAddress() {
        return this.endereco;
    }
    /**
     * Setters
     */
    setId(id) {
        this.id = id;
    }
    setName(nome) {
        this.nome = nome;
    }
    setCPF(cpf) {
        this.cpf = cpf;
    }
    setPhone(telefone) {
        this.telefone = telefone;
    }
    setEmail(email) {
        this.email = email;
    }
    setAddress(endereco) {
        this.endereco = endereco;
    }
}
exports.User = User;
