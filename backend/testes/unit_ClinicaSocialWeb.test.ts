import { ClinicaSocialWeb } from "../adaptadores/ClinicaSocialWeb";
import { RepositorioImpl } from "../adaptadores/RepositorioImpl";
import { CRUDImpl } from "../dominio/servicos/CRUDImpl";
import { Request, Response } from "express";
/**
 * Este arquivo define testes de unidade para o adaptador web ClinicaSocialWeb.
 */

/**
 * Setup Variables
 */
const repo = new RepositorioImpl()
const crud = new CRUDImpl(repo)
const clinicaSocialWeb = new ClinicaSocialWeb(crud)
const testStartString = '[Unit-Tests] [Adaptador] [ClinicaSocialWeb] '

/**
 * Unit Tests
 */
test(testStartString + 'checkIfPromise(resposta: any): boolean', async () => {
  expect(
    clinicaSocialWeb.checkIfPromise(async() =>{})
  ).toBe(false)
  expect(
    clinicaSocialWeb.checkIfPromise(() => {})
  ).toBe(false)
  expect(
    clinicaSocialWeb.checkIfPromise({})
  ).toBe(false)
  expect(
    clinicaSocialWeb.checkIfPromise(
      crud.retornarTodosObjetos('clientes')
    )
  ).toBe(true)
})
