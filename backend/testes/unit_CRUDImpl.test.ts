
import { RepositorioImpl } from "../adaptadores/RepositorioImpl";
import { CRUDImpl } from "../dominio/servicos/CRUDImpl";

/**
 * Este arquivo define testes de unidade para o serviço CRUDImpl.
 */

/**
 * Setup Variables
 */
const repo = new RepositorioImpl()
const crud = new CRUDImpl(repo)
const testStartString = '[Unit-Tests] [Serviço] [CRUDImpl] '

test(testStartString + 'validarCategoriaDeObjeto(object_type: string): void', async () => {
  expect(() => {
    crud.validarCategoriaDeObjeto('cliente')
  }).toThrow()
})

/**
 * Unit Tests
 */
test(testStartString + 'validarChave(object_type: string, chave: string): void', async () => {
  expect(() => {
    crud.validarChave('clientes', 'campo_invalido')
  }).toThrow()
  expect(() => {
    crud.validarChave('psicologos', 'campo_invalido')
  }).toThrow()
  expect(() => {
    crud.validarChave('secretarias', 'campo_invalido')
  }).toThrow()
  expect(() => {
    crud.validarChave('consultas', 'campo_invalido')
  }).toThrow()
  expect(() => {
    crud.validarChave('prontuarios', 'campo_invalido')
  }).toThrow()
})

test(testStartString + 'validarTipos(object_type: string, chave:string, valor: any): void', async () => {
  const mockEndereco = {
    complemento: "Ap. 203",
    numero: "456",
    estado: "Minas Gerais",
    bairro: "Belvedere",
    cidade: "Belo Horizonte",
    cep: "31333333"
  }

  expect(() => {
    crud.validarTipos('clientes', 'endereco', 123)
  }).toThrow()
  expect(() => {
    crud.validarTipos('clientes', 'endereco', 'valor_invalido_para_endereco')
  }).toThrow()
  expect(() => {
    crud.validarTipos('clientes', 'qualquer_chave', 123)
  }).toThrow()
  expect(() => {
    crud.validarTipos('clientes', 'qualquer_chave', true)
  }).toThrow()
  expect(() => {
    crud.validarTipos('clientes', 'qualquer_chave', mockEndereco)
  }).toThrow()
  expect(() => {
    crud.validarTipos('clientes', 'qualquer_chave', class mockClass{})
  }).toThrow()
  expect(() => {
    crud.validarTipos('clientes', 'qualquer_chave', [1,2,3])
  }).toThrow()
  expect(() => {
    crud.validarTipos('clientes', 'qualquer_chave', () => {})
  }).toThrow()
})

test(testStartString + 'validarQuantidadeDeCampos(object_type:string, quantidadeDeCamposEncontrados: number): void', async () => {
  expect(() => {
    crud.validarQuantidadeDeCampos('clientes', 0)
  }).toThrow()
  expect(() => {
    crud.validarQuantidadeDeCampos('psicologos', 0)
  }).toThrow()
  expect(() => {
    crud.validarQuantidadeDeCampos('secretarias', 0)
  }).toThrow()
  expect(() => {
    crud.validarQuantidadeDeCampos('consultas', 0)
  }).toThrow()
  expect(() => {
    crud.validarQuantidadeDeCampos('prontuarios', 0)
  }).toThrow()
})
