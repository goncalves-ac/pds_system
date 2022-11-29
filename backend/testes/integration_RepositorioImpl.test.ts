import { RepositorioImpl } from "../adaptadores/RepositorioImpl";

/**
 * Este arquivo define testes de integração para o adaptador para banco de dados RepositorioImpl.
 */

const repo = new RepositorioImpl()
const testStartString = '[Integração] [Adaptador] [RepositorioImpl] '

test(testStartString + 'algo a ser testado', async () => {
  // expect(
  //   await crud.deletarObjeto('JLuuJTYws5Mrhpd7fIpO', 'cliente')
  // ).toBe('O tipo de entidade "cliente" não existe. Favor passar na rota um tipo válido.')
  expect('something').toBe('something')
})