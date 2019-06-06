/// <reference types="Cypress" />

context('Prices should be lower for different return point', () => {

    it('Should have a cheaper price while returning to the same adress', ()=>{
        cy.visit('https://www.kayak.com/cars');
        cy.get('input').contains('').type('SFO');
    } )},
    )