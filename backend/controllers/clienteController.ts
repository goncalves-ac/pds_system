import { Request, Response, NextFunction } from 'express'
import { db } from '../db';
import { Cliente } from '../domain/Cliente';

// const Cliente = require('../domain/Cliente');
const firestore = db.firestore();

const addCliente = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    await firestore.collection('clientes').doc().set(data);
    res.send('Record saved successfuly');
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
}

const getAllClientes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collectionClientes = await firestore.collection('clientes')
    const data = await collectionClientes.get()
    const clientes = []

    if (data.empty) {
      res.status(404).send('Sem clientes cadastrados')
    } else {
      res.send('Kinda works!')
    }

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      console.log('Unexpected error', error);
    }
  }
}

module.exports = {
  addCliente,
  getAllClientes,
}
