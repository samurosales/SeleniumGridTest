const { describe, it, after, before } = require('mocha');
const { until } = require('selenium-webdriver');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


const Page = require('../lib/funciones');
process.on('unhandledRejection', () => {});

(async function example() {
    try {

        describe('Prueba de creacion de Producto - Correcta', async function() { 
            this.timeout(50000);
            var driver, page;


            before(async() => {

                page = new Page();
                driver = page.driver;
                await page.visit(`http://35.193.209.112:3000/login`);

            });

            after(async() => {

                await page.quit();

            });


            it('Login', async() => {
                
                await page.submitUserData('root', 'root');
                await page.clickButton('login')
                await driver.manage().setTimeouts( { implicit: 5000 } );
                driver.wait(until.urlContains('/admin/dashboard'));

            }); 

            it('Click pestana de Productos', async() => {

                await page.visit(`http://35.193.209.112:3000/admin/crear-productos`);

            });

            it('Llena los datos del Producto', async() => {
                
                await page.submitProductData('cirque du freak', 9.99, 'mejores libros de la historia');

            });

            it('Click en boton de Producto', async() => {
                
                await page.clickButton('prBtn')
                // driver.wait(until.urlContains('/admin/crear-productos'));
                const inputValue = await page.getInputValue()
                expect(inputValue.value === '')

            });

        });

    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {

    }
})();
