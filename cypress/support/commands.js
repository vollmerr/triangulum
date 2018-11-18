// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('selectOption', (dataCy, text) => {
  return cy.get(dataCy)
    .first()
    .click({ force: true })
    .get('.menu')
    .contains(text)
    .click();
});

Cypress.Commands.add('getCrawl', (body) => {
  const testUrl = Cypress.env('testUrl');
  return cy.request({
    url: '/api/crawl',
    method: 'POST',
    body: JSON.stringify({
      url: testUrl,
      type: 'bfs',
      limit: 1,
      keyword: 'test',
      ...body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => JSON.parse(res.body));
})
