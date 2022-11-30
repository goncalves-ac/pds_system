describe('Como administrador, eu quero cadastrar  novos clientes, psicólogos e secretárias', () => {   

  it('Cadastro de paciente deve retornar sucesso', () => {   

    cy.visit('http://localhost:3000') 

    cy.get(('[placeholder="E-mail"]')).click()
    cy.get('[placeholder="E-mail"]').type('admin')

    cy.get(('[type="password"]')).click()
    cy.get('[type="password"]').type('12345')

    cy.contains('Entrar').click()

    cy.get(('[data-cy ="cadastro"]')).click()

    cy.get('input[placeholder="Nome"]').click({force: true})
    cy.get('input[placeholder="Nome"]').type(request.nome)

    cy.get('input[placeholder="000.000.000-00"]').click({force: true})
    cy.get('input[placeholder="000.000.000-00"]').type(request.cpf)

    cy.get('input[placeholder="Ex.: (99) 99999-9999"]').click({force: true})
    cy.get('input[placeholder="Ex.: (99) 99999-9999"]').type(request.telefone)

    cy.contains('Cadastrar').click({force: true})

    cy.request({
      url: '/api/add/clientes',
      body: { request },
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  }) 
})

export const request = {
  nome: 'Joao',
  telefone: '319999999999',
  cpf: '1221212121212',
  email: '',
  endereco: {
      estado: '',
      cidade: '',
      bairro: '', 
      numero: '',
      complemento : '',
      cep: '',
  },
}
