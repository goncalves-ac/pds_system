describe('Como usuário, desejo visualizar as últimas notícias disponibilizadas', () => {   

  it('Abrir modal com noticia na pagina home', () => {   

    cy.visit('http://localhost:3000') 

    cy.get(('[placeholder="E-mail"]')).click()
    cy.get('[placeholder="E-mail"]').type('admin')

    cy.get(('[type="password"]')).click()
    cy.get('[type="password"]').type('12345')

    cy.contains('Entrar').click()

    cy.contains('Vacinação').click()

    cy.get(('div[role="dialog"')).should('be.visible')
    cy.location('pathname').should('include', '/home')

  }) 
})