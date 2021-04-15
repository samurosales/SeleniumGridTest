let Page = require('./driver');

const fake = require('../utils/fakeData');
const fakeNameKeyword = fake.nameKeyword;

let searchInput, searchButton, resultStat;

Page.prototype.findInputAndButton = async function() {
    searchInput = await this.findByName("q");
    searchButton = await this.findByName("btnK");

    const result = await this.driver.wait(async function() {
        const searchInputEnableFlag = await searchInput.isEnabled();
        const searchButtonText = await searchButton.getAttribute('value');
        return {
            inputEnabled: searchInputEnableFlag,
            buttonText: searchButtonText
        }
    }, 5000);
    return result;
};


Page.prototype.submitKeywordAndGetResult = async function() {
    await this.findInputAndButton();
    await this.write(searchInput, fakeNameKeyword);
    await searchInput.sendKeys("\n");

    resultStat = await this.findById("result-stats");
    return await this.driver.wait(async function() {
        return await resultStat.getText();
    },5000);
};

Page.prototype.submitUserData = async function(user, pass) {


    let userInput = await this.findById('email');
    let PassInput = await this.findById('password');
    
    await this.write(userInput, user);
    await this.write(PassInput, pass);
 
}

Page.prototype.submitProductData = async function(name, price, desc, img) {


    let nameInput = await this.findById('txtNombre');
    let precioInput = await this.findById('txtPrecio');
    let descripcionInput = await this.findById('txtDescripcion');
    let imgInput = await this.findById('imagenProducto');
    
    await this.write(nameInput, name);
    await this.write(precioInput, price);
    await this.write(descripcionInput, desc);
    // await this.write(imgInput, pass);
 
}

Page.prototype.clickButton = async function(id){

    let button = await this.findById(id);

    button.click()

}


Page.prototype.getInputValue = async function(){

    let nameInput = await this.findById('txtNombre');

    return nameInput.textContent

}



module.exports = Page;