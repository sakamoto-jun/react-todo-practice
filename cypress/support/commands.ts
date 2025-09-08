/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

const DEFAULT_USER = {
  username: "admin",
  password: "admin",
};

const login = (user) => {
  cy.visit("/login");
  cy.findByLabelText("username").type(user.username);
  cy.findByLabelText("password").type(user.password);
  cy.findByRole("button", { name: /Login/i }).click();
  cy.url().should("eq", `${Cypress.config().baseUrl}/`);
};

// -- This is a parent command --
Cypress.Commands.add("login", (user = DEFAULT_USER) => {
  login(user);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(user?: { username: string; password: string }): Chainable<void>;
    }
  }
}
