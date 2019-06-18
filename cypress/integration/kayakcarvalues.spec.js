/// <reference types="Cypress" />

context('Prices should be lower for different return point', () => {

    it('Should have a cheaper price while returning to the same adress', ()=> {
        cy.visit('https://www.kayak.com/cars');
        //Primer intento, como se vería en pantalla, no funciona porque no enccuentra el input que contenga esto.
        //cy.get('input').contains('Enter an airport, city, or address').type('SFO');
        //Pruebo de localizarlo sin marcar que sea un input.
        //cy.contains('Enter an airport, city, or address').type('SFO');
        //Esto falla porque resullta que no es el texto dell input, sino un elemento que está enima hasta que lo clickeas
        //cy.contains('Enter an airport, city, or address').click();
        //Sabiendo que es otro elemento decidí hacerle click, se muestra encima el campo de input
        //Entonces analizo el source y veo que estos dos elementos están dentro del mismo div padre, salgo a buscarlo
        //cy.contains('Enter an airport, city, or address').parent('div').parent('div').parent('div').children('','input').type('SFO')
        //No funcionó, no encuentra el children del tipo input. Pruebo con un get en lugar del children que sugería la doccucmentación
        //cy.contains('Enter an airport, city, or address').parent('div').parent('div').parent('div').get('input').type('SFO')
        //Sigue devolviendo los 99 inputs, como si no tuviese en cuenta que tiene que estar contenido en el parent que encuentro :/
        //me pongo a buscar el tema de ingresar mútiples aeropuertos
        cy.contains('Same drop-off').click();
        cy.contains('\n' +
            'Different drop-off').click();
        cy.contains('From?').click();
        //cy.focused().then(($el) => {
        //    const elem = $el;
        //
        //    cy.wrap(elem).type('SFO');
        //});
        //Ahora no me toma ese paso directamente, sigo escribiendo más pasos para ver si cypress me toma los cambios
        //cy.contains('To?').click();
        //cy.focused().then(($el) => {
        ////   const elem = $el;
//
        //           cy.wrap(elem).type('LAX');
        // });
        //El focus type directo no funcionaba, la docu recomienda usarlo como callback

        //Tampoco el elemento en foco es tipeable...
        //cy.contains('From?').parent('div').as('Alias');
        cy.get('input[name="pickup"]:first').type('SFO {enter}')
        //Volví a inspeccionar el source y encontré que el name no tenía randoms antes (En algún momento probé usar REGEX
        //para sacar el input, pero el contains no me lo devolvía, dentro del get no me tomaba la expresión
        //cy.contains('San Francisco, CA').click()
        cy.contains('To?').click();
        cy.get('input[name="dropoff"]:first').type('LAX {enter}');
        //cy.contains('Los Angeles, CA').click();
        //Por algún motivo Los Angeles, CA no lo encontraba confiablemente (2 de cada 5 maso), así que probé si tomaba con enter el primero, y tada

        //No encuentro cómo especificar que sea el submit del form de carros en su source, entonces decido usar un
        // within que descubrí intentando encontrar e input de texto antes
        cy.get('section[class="form-section"]').within(($form) => {cy.get('button[type="submit"]').click()});
        cy.wait(1000);
        cy.contains('Please confirm that you are a real KAYAK user.').log('llegamos a un captcha, perdimos.');

        //Aca sigo teóricamente, no lo llega, para debuguear voy a las páginas con el querystring directo que de al búsqueda
//        cy.contains('price').should("below",variableConElValorAnterior)


    } ,
    it('Should have a lower price with different cities',  ()=>{
        cy.visit('https://www.kayak.com/cars/SFO-a13852/LAX-a16078/2019-06-18/2019-06-20?sort=rank_a');
        cy.get('div[class="CarResultsList"]').within(($form) => {
            cy.get('//*/div/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]')
        })

    }))},
    )