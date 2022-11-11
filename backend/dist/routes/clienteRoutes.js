"use strict";
const express = require('express');
const { addCliente, getAllClientes, getCliente, updateCliente, deleteCliente } = require('../controllers/clienteController');
const router = express.Router();
router.post('/add-cliente', addCliente);
router.get('/get-all-clientes', getAllClientes);
router.get('/get-cliente/:id', getCliente);
router.put('/update-cliente/:id', updateCliente);
router.delete('/delete-cliente/:id', deleteCliente);
module.exports = {
    routes: router
};
