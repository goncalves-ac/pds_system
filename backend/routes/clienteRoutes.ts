const express = require('express');
const {
  addCliente,
  getAllClientes
} = require('../controllers/clienteController');

const router = express.Router();

router.post('/add-cliente', addCliente);
router.get('/get-all-clientes', getAllClientes);

module.exports = {
  routes: router
}