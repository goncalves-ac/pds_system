
import { RepositorioImpl } from "../adaptadores/RepositorioImpl";
import { Cliente } from "../dominio/entidades/Cliente";
import { CRUDImpl } from "../dominio/servicos/CRUDImpl";

/**
 * Este arquivo define testes de integração para o serviço CRUDImpl.
 */

/**
 * Setup Variables
 */
const repo = new RepositorioImpl()
const crud = new CRUDImpl(repo)
const testStartString = '[Integração] [Serviço] [CRUDImpl] '
const object_type = 'clientes'
const mockObject = {
  nome: "Josias Ferdinando",
  cpf: "99999999999",
  telefone: "31922222222",
  email: "JosiasFerdinando@gmail.com",
  endereco: {
    complemento: "Ap. 222",
    numero: "123",
    estado: "Minas Gerais",
    bairro: "Centro",
    cidade: "Belo Horizonte",
    cep: "32222222"
  }
}
const mockReturnObject = new Cliente (
  undefined,
  mockObject.nome,
  mockObject.cpf,
  mockObject.telefone,
  mockObject.email,
  mockObject.endereco
)

/**
 * Undo test changes in the database.
 */
const tearDown = async() => {
  const collection = await crud.retornarTodosObjetos(object_type)
  collection.forEach((element : any) => {
    if(element.cpf === mockObject.cpf) {
      crud.deletarObjeto(element.id, object_type)
    }
  });
}

/**
 * Setup test functions by adding a mock object to the database.
 */
const setup = async() => {
  expect(
    await crud.adicionarObjeto(mockObject, object_type)
  ).toBe('(SUCESSO) Objeto do tipo:"' + object_type + '" adicionada ao banco de dados.')
}

test(testStartString + 'adicionarObjeto(data: any, object_type: string): any', async () => {
  await setup()
  await tearDown()
})

test(testStartString + 'retornarEntidadeUsuario(cpf: string, entity_type: string)', async () => {
  await setup()

  const returnedEntity = await crud.retornarEntidadeUsuario(mockObject.cpf, object_type)
  expect(returnedEntity).toStrictEqual(mockReturnObject)

  await tearDown()
})

test(testStartString + 'deletarObjeto(id: string, object_type: string)', async () => {
  await setup()

  const collection = await crud.retornarTodosObjetos(object_type)
  let mockID = '';
  collection.forEach((element : any) => {
    if(element.cpf === mockObject.cpf) {
      mockID = element.id
    }
  });

  expect(
    await crud.deletarObjeto(mockID, object_type)
  ).toBe('(SUCESSO) Objeto do tipo:"' + object_type + '" deletada do banco de dados.')

  await tearDown()
})

test(testStartString + 'atualizarObjeto(id: string, data: any, entity_type: string)', async () => {
  await setup()

  const mockUpdateObject = mockObject
  mockUpdateObject.nome = 'Novo Josias'

  let collection = await crud.retornarTodosObjetos(object_type)
  let mockIdBefore = ''
  collection.forEach((element : any) => {
    if(element.cpf === mockObject.cpf) {
      mockIdBefore = element.id
    }
  });

  expect(
    await crud.atualizarObjeto(mockIdBefore, mockUpdateObject, object_type)
  ).toBe('(SUCESSO) Objeto do tipo:"' + object_type + '" atualizada no banco de dados.')

  collection = await crud.retornarTodosObjetos(object_type)
  let mockIdAfter = ''
  let nomeAtualizado = ''
  collection.forEach((element : any) => {
    if(element.cpf === mockObject.cpf) {
      mockIdAfter = element.id
      nomeAtualizado = element.nome
    }
  });

  expect(mockIdAfter).toBe(mockIdBefore)
  expect(nomeAtualizado).toBe(mockUpdateObject.nome)
  await tearDown()
})




