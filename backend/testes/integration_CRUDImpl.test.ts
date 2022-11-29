
import { RepositorioImpl } from "../adaptadores/RepositorioImpl";
import { CRUDImpl } from "../dominio/servicos/CRUDImpl";

/**
 * Este arquivo define testes de integração para o serviço CRUDImpl.
 */

const repo = new RepositorioImpl()
const crud = new CRUDImpl(repo)
const testStartString = '[Integração] [Serviço] [CRUDImpl] '

test(testStartString + 'algo a ser testado', async () => {
  expect('something').toBe('something')
})
