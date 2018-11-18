const testUrl = Cypress.env('testUrl');
const urlSelector = '[data-cy=field-url] input';
const typeSelector = '[data-cy=field-type]';
const limitSelector = '[data-cy=field-limit] input';
const keywordSelector = '[data-cy=field-keyword] input';
const errorSelector = '[data-cy=message-error]';
const loaderSelector = '[data-cy=loader]';

const fillOutForm = ({ url, type, limit, keyword }) => {
  if (url) cy.get(urlSelector).type(url);
  if (type) cy.selectOption(typeSelector, type)
  if (limit) cy.get(limitSelector).type(limit)
  if (keyword) cy.get(keywordSelector).type(keyword);
  // submit it
  return cy.contains('Send').click();
};

describe('form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('submits the form and redirects', () => {
    // fill it out
    fillOutForm({ url: testUrl, type: 'Breadth-first', limit: 1, keyword: 'test' })
    // displays a loading indicator
    .get(loaderSelector).should('exist')
    // redirects to graph
    .hash().should('include', '/graph');
  });

  it('handles form validation', () => {
    // fill out part of form
    fillOutForm({ url: testUrl, type: 'Breadth-first' })
    // displays an error in the field
    .get(`.error ${limitSelector}`).should('exist')
    // displays and a list of all errors
    .get(errorSelector).contains('Limit is Required').should('exist')
    // clears error when value added
    .get(limitSelector).type(1)
    // no more error on field
    .get(`.error ${limitSelector}`).should('not.exist')
    // no more list of errors
    .get(errorSelector).should('not.exist');
  });

  it('updates the history in localStorage', () => {
    // fill it out
    fillOutForm({ url: testUrl, type: 'Breadth-first', limit: 1, keyword: 'test' })
    // history updated with this crawl
    .should(() => {
      const history = localStorage.getItem('crawlHistory');
      expect(history).to.not.equal(undefined);
      expect(history).to.not.equal({});
    })
  });

  it('renders correctly at all viewports', () => {
    cy.viewport('macbook-15').wait(300);
    cy.screenshot('form-desktop');
    cy.viewport('macbook-13').wait(300);
    cy.viewport('macbook-11').wait(300);
    cy.viewport('ipad-2').wait(300);
    cy.viewport('ipad-2', 'landscape').wait(300);
    cy.viewport('ipad-mini').wait(300);
    cy.viewport('ipad-mini', 'landscape').wait(300);
    cy.viewport('iphone-6+').wait(300);
    cy.viewport('iphone-6+', 'landscape').wait(300);
    cy.viewport('iphone-6').wait(300);
    cy.screenshot('form-mobile');
    cy.viewport('iphone-6', 'landscape').wait(300);
    cy.viewport('iphone-5').wait(300);
    cy.viewport('iphone-5', 'landscape').wait(300);
    cy.viewport('iphone-4').wait(300);
    cy.viewport('iphone-4', 'landscape').wait(300);
    cy.viewport('iphone-3').wait(300);
    cy.viewport('iphone-3', 'landscape').wait(300);
  });
});
