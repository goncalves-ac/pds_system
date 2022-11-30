describe('Como administrador, eu quero poder visualizar as listas de usuários', () => {   

  it('Retornar os dados dos usuarios com sucesso', () => {  

    cy.server()
    cy.route('GET', 'http://localhost:8083/api/get-all/clientes').as('getAllClient') 

    cy.visit('http://localhost:3000') 

    cy.get(('[placeholder="E-mail"]')).click()
    cy.get('[placeholder="E-mail"]').type('admin')

    cy.get(('[type="password"]')).click()
    cy.get('[type="password"]').type('12345')

    cy.contains('Entrar').click()

    cy.get(('[data-cy ="cliente"]')).click()

    cy.wait('@getAllClient').should((xhr) => {
      expect(xhr.status, 'successful GET').to.equal(200)
    })
  }) 
})