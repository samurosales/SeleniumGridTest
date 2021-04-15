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
                await page.visit(`http://35.193.209.112:3000/login`);

            });

           

            it('Ingresa Datos Correctos', async() => {
                await page.submitUserData('usuario', 'algo');
            }); 

            it('Click en boton de login', async() => {

                await page.clickButton('login')

            });

            it('Inicia session Fallida', async() => {
                
                driver.wait(until.urlContains('/login'))

            });


            after(async() => {
                await page.quit();
            });


        });

    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {

    }
})();
