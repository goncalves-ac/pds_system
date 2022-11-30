describe('Como administrador eu gostaria de ter acesso à um formulário de cadastro', () => {   

  it('Deve carregar a pagina de formulario de cadastro', () => {   

    cy.visit('http://localhost:3000') 

    cy.get(('[placeholder="E-mail"]')).click()
    cy.get('[placeholder="E-mail"]').type('admin')

    cy.get(('[type="password"]')).click()
    cy.get('[type="password"]').type('12345')

    cy.contains('Entrar').click()

    cy.get(('[data-cy ="cadastro"]')).click()

    cy.location('pathname').should('include', '/cadastro')
  }) 
})