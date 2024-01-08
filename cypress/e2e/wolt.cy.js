describe('Burger Ordering Test', () => {
  const runs = [
    {burger: 'Zepelinus'},
    {burger: 'Portobelo'},
  ];

  beforeEach(() => {
    // navigation to wolt page
    cy.visit('https://wolt.com');
    cy.contains('div', 'Accept').click();
    
    // select location
    cy.get('input[id="front-page-input"]')
      .type('Kauno Dokas')
      .click();

    cy.contains('Kauno Dokas')
      .first()
      .click();

    // select restaurants tab
    cy.get('a[href^="/en/discovery/restaurants"]:nth-child(1)')
      .click();

    // select burgers category
    cy.get('a[href^="/en/discovery/category/burgers"]')
      .click();

    // select restaurant
    cy.get('main').focus();
    const restaurant  = cy.get('a[data-test-id="venueCard.kuhne"]');
    restaurant.scrollIntoView();
    restaurant.click();
  })

  runs.forEach(run => {

    it(`Selecting "${run.burger}" burger from the menu and adding burger to the cart`, () => {
      // select burger
      cy.contains('h3', run.burger)
        .parent()
        .parent()
        .parent()
        .click();

      // add to order
      cy.contains('span', 'Add to order')
        .click();
  
      // assert ordered item name is correct
      cy.get('button[data-test-id="cart-view-button"]:nth-child(1)')
        .click();
      cy.get('span[data-test-id="CartItemName"]')
        .should('have.text', run.burger);
      
      // assert order item count is correct
      cy.get('span[data-test-id="CartItemStepperValue"]')
        .should('have.text', '1');

      // assert login popup present
      cy.get('button[data-test-id="CartViewNextStepButton"]')
        .click();
      cy.get('h2[data-test-id="MethodSelect.Title"]')
        .should('have.text', 'Create an account or log in');
    })
  })

})