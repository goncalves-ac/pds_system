import { RepositorioClienteImpl } from "../RepositorioClienteImpl"

const express = require('express')

const repo = new RepositorioClienteImpl();

const router = express.Router()

router.post('/add-cliente', repo.addCliente)
router.get('/get-all-clientes', repo.getAllClientes)
router.get('/get-cliente/:id', repo.getCliente)
router.put('/update-cliente/:id', repo.updateCliente)
router.delete('/delete-cliente/:id', repo.deleteCliente)

module.exports = {
  routes: router
}