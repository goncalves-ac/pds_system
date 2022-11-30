describe('Como administrador, eu quero verificar a agenda e adicionar consultas', () => {   

  it('Retornar os dados dos usuarios com sucesso', () => {  

    cy.visit('http://localhost:3000') 

    cy.get(('[placeholder="E-mail"]')).click()
    cy.get('[placeholder="E-mail"]').type('admin')

    cy.get(('[type="password"]')).click()
    cy.get('[type="password"]').type('12345')

    cy.contains('Entrar').click()

    cy.get(('[data-cy ="agenda"]')).click()

    cy.get(('[data-cy ="button-add-consulta"]')).click({force: true})

    cy.get('input[placeholder="nome paciente"]').click({force: true})
    cy.get('input[placeholder="nome paciente"]').type(consulta.nomeCliente)

    cy.get('input[placeholder="nome psicologo"]').click({force: true})
    cy.get('input[placeholder="nome psicologo"]').type(consulta.nomePsicologo)

    cy.get('input[placeholder="dia"]').click({force: true})
    cy.get('input[placeholder="dia"]').type(consulta.dia)

    cy.get('input[placeholder="mes"]').click({force: true})
    cy.get('input[placeholder="mes"]').type(consulta.mes)

    cy.get('input[placeholder="ano"]').click({force: true})
    cy.get('input[placeholder="ano"]').type(consulta.ano)

    cy.get('input[placeholder="hora"]').click({force: true})
    cy.get('input[placeholder="hora"]').type(consulta.hora)

    cy.server()
    cy.route('GET', 'http://localhost:8083/api/get-all/consultas').as('getConsultasRequest') 

    cy.contains('Salvar').click()

    cy.request('POST', 'http://localhost:8083/api/add/consultas', {
      nomeCliente: 'Julia',
      nomePsicologo: 'Pedro',
      dia: '1',
      mes: '12',
      ano: '2022',
      hora: '13:00',
    }).as('addConsultasRequest')
    cy.get('@addConsultasRequest').then(res => {
        expect(res.status).to.eq(200)
        assert.isString(res.body, '(SUCESSO) Objeto do tipo:"consultas" adicionada ao banco de dados. to be an array')
    })

    cy.wait('@getConsultasRequest').should((xhr) => {
      expect(xhr.status, 'successful GET').to.equal(200)
      assert.isArray(xhr.response.body, 'get Response is an array') 
    })
  }) 
})

export const consulta = {
  nomeCliente: 'Julia',
  nomePsicologo: 'Pedro',
  dia: '1',
  mes: '12',
  ano: '2022',
  hora: '13:00',
}