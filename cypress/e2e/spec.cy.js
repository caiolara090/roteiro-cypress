describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  });

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  // Vamos testar marcar 5 tarefas como concluídas
  it('Marca todas as tarefas como concluídas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}')
      .type('Tarefa 3{enter}')
      .type('Tarefa 4{enter}')
      .type('Tarefa 5{enter}');

    cy.get('.toggle-all').click();

    cy.get('.todo-list li')
      .each($el => {
        cy.wrap($el).find('.toggle').click();
      });

      cy.get('.todo-list li')
      .each($el => {
        cy.wrap($el).find('.toggle').should('be.checked');
      });
  });


  // Vamos editar uma tarefa existente
  it('Edita uma tarefa existente', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa editável{enter}');

    cy.get('.todo-list li')
      .dblclick()
      .find('.edit')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa editada');
  });

  // Vamos limpar as tarefas concluídas
  it('Limpa todas as tarefas concluídas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.get('.clear-completed').click();

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa 2');
  });
});
