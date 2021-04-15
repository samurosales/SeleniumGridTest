const { Builder, By, until, Key } = require('selenium-webdriver');

// const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver');
// let options = new chrome.Options();
// options.addArguments('disable-infobars');
// options.addArguments('--headless'); // running test on visual chrome browser
// options.setUserPreferences({ credential_enable_service: false });

SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
//var cbtHub = `http://${process.env.HUB_HOST}:4444/wd/hub`

var cbtHub = `http://104.198.140.6:4444/wd/hub`

var caps = {
    name: "Chrome Test",
    setPageLoadStrategy: "eager",
    browserName: "chrome",
    browserVersion: "89.0.4389.82",
    'chromeOptions': {
      'args': ['--window-size=1920x1080']
    }
  };




var Page = function() {

    this.driver = new Builder()
    // .setChromeOptions(options)
    .withCapabilities(caps)
    .usingServer(cbtHub)
    // .forBrowser('chrome')
    .build();

    // visit a webpage
    this.visit = async function(theUrl) {
        return await this.driver.get(theUrl);
    };


    // quit current session
    this.quit = async function() {
        return await this.driver.quit();
    };


 // wait and find a specific element with it's id
 this.findById = async function(id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
    return await this.driver.findElement(By.id(id));
};

 // wait and find a specific element with it's name
 this.findByName = async function(name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
    return await this.driver.findElement(By.name(name));
};


 // fill input web elements
this.write = async function(el, txt) {
    return await el.sendKeys(txt);
};




};

module.exports = Page;
