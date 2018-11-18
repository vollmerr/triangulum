let response;
describe('graph', () => {
  before(() => {
    cy.getCrawl().then((res) => { response = res; });
  });

  beforeEach(() => {
    cy.visit('/#/graph', {
      onBeforeLoad () {
        // set a crawl in localstorage to load into graph
        localStorage.setItem('crawlId', 'testId');
        localStorage.setItem('crawlHistory', JSON.stringify({
          testId: { id: 'testId', response },
        }));
      }
    });
  });

  it('renders correctly at all viewports', () => {
    cy.viewport('macbook-15').wait(300);
    cy.viewport('macbook-13').wait(300);
    cy.viewport('macbook-11').wait(300);
    cy.viewport('ipad-2').wait(300);
    cy.viewport('ipad-2', 'landscape').wait(300);
    cy.viewport('ipad-mini').wait(300);
    cy.viewport('ipad-mini', 'landscape').wait(300);
    cy.viewport('iphone-6+').wait(300);
    cy.viewport('iphone-6+', 'landscape').wait(300);
    cy.viewport('iphone-6').wait(300);
    cy.viewport('iphone-6', 'landscape').wait(300);
    cy.viewport('iphone-5').wait(300);
    cy.viewport('iphone-5', 'landscape').wait(300);
    cy.viewport('iphone-4').wait(300);
    cy.viewport('iphone-4', 'landscape').wait(300);
    cy.viewport('iphone-3').wait(300);
    cy.viewport('iphone-3', 'landscape').wait(300);
  });
});
