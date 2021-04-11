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

        describe('Prueba de Inicio de Sesion - Incorrecta', async function() { 
            this.timeout(50000);
            var driver, page;


            before(async() => {
                page = new Page();
                driver = page.driver;
                await page.visit('http://localhost:3000/login');

            });

            after(async() => {
                await page.quit();
            });


            it('Ingresa Datos Correctos', async() => {
                await page.submitUserData('usuario', 'algo');
            }); 

            it('Click en boton de login', async() => {

                await page.clickButton('login')
                await driver.manage().setTimeouts( { implicit: 5000 } );

            });

            it('Inicia session Fallida', async() => {
                
                await expect(driver.wait(until.urlContains('/login')))

            });


        });

    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {

    }
})();
