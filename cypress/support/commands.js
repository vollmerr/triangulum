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

const host = Cypress.env('wsUrl');
let ws = new WebSocket(host); // eslint-disable-line
ws.init = () => {
  ws = new WebSocket(host);
};
ws.onclose = ws.init;

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
  const request = {
    url: testUrl,
    type: 'bfs',
    limit: 3,
    keyword: 'test',
    ...body,
  };

  let resolve;
  const getData = new Promise((res, rej) => {
    resolve = res;
  });

  ws.onmessage = (msg) => {
    const data = {
      request,
      response: JSON.parse(msg.data),
      created: new Date('1969-01-01'),
      updated: new Date('3000-08-22'),
    };

    resolve(data);
  }

  ws.send(JSON.stringify(request));

  return getData;
});
