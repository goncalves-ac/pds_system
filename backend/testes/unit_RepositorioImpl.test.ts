import { RepositorioImpl } from "../adaptadores/RepositorioImpl";

/**
 * Este arquivo define testes de unidade para o adaptador para banco de dados RepositorioImpl.
 */

const repo = new RepositorioImpl()
const testStartString = '[Unit-Tests] [Adaptador] [RepositorioImpl] '

test(testStartString + 'algo a ser testado', async () => {
  expect('something').toBe('something')
})