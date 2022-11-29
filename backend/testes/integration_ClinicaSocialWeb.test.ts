import { ClinicaSocialWeb } from "../adaptadores/ClinicaSocialWeb";
import { RepositorioImpl } from "../adaptadores/RepositorioImpl";
import { CRUDImpl } from "../dominio/servicos/CRUDImpl";

/**
 * Este arquivo define testes de integração para o adaptador web ClinicaSocialWeb.
 */

const repo = new RepositorioImpl()
const crud = new CRUDImpl(repo)
const clinicaSocialWeb = new ClinicaSocialWeb(crud)
const testStartString = '[Integração] [Adaptador] [ClinicaSocialWeb] '

test(testStartString + 'algo a ser testado', async () => {
  // expect(
  //   await crud.deletarObjeto('JLuuJTYws5Mrhpd7fIpO', 'cliente')
  // ).toBe('O tipo de entidade "cliente" não existe. Favor passar na rota um tipo válido.')
  expect('something').toBe('something')
})