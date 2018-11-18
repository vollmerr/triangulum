const menuSelector = '[data-cy=button-menu]';

describe('header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders correctly in desktop', () => {
    cy.viewport('macbook-15').wait(300);
    cy.screenshot('header-desktop');
  });

  it('renders correctly in mobile', () => {
    cy.viewport('iphone-6').wait(300);
    cy.screenshot('header-mobile-closed');
    // open nav menu
    cy.get(menuSelector).click().wait(300);
    cy.screenshot('header-mobile-open');
  });

  it('opens pages in the desktop nav', () => {
    cy.viewport('macbook-15');
    cy.contains('History').click();
    cy.hash().should('include', '/history');
  });

  it('opens pages in the mobile nav', () => {
    cy.viewport('iphone-6');
    // open nav menu
    cy.get(menuSelector).click();
    cy.contains('History').click();
    cy.hash().should('include', '/history');
  });
});
