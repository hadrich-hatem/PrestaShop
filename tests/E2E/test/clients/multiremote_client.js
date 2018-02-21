var CommonClient = require('./common_client');
var path = require('path');

class MultiremoteClient extends CommonClient{

  constructor() {
    super(true);
  }

  signInFO(selector, firstCustomerData, secondCustomerData) {
    this.client.browserA
      .signInFO(selector, URL, date_time + firstCustomerData.email, firstCustomerData.password);
    this.client.browserB
      .signInFO(selector, URL, date_time + secondCustomerData.email, secondCustomerData.password);
    return this.client.sync();
  };

  signInBO(selector) {
    this.client.browserA
      .signInBO(selector);
    this.client.browserB
      .signInBO(selector);
    return this.client.sync();
  };

  signOutBO() {
    this.client.browserA
      .signOutBO();
    this.client.browserB
      .signOutBO();
    return this.client.sync();
  };

  goToSubtabMenuPage(menuSelector, selector, timeout = 90000) {
    return this.client
      .waitForExist(menuSelector, timeout)
      .moveToObject(menuSelector)
      .waitForVisible(selector, timeout)
      .click(selector);
  };

  waitAndSetValue(selector, firstValue, secondValue, timeout = 90000) {
    this.client.browserA
      .waitAndSetValue(selector, firstValue, timeout);
    this.client.browserB
      .waitAndSetValue(selector, secondValue, timeout);
    return this.client.sync();
  }

  waitAndSelectByValue(selector, firstValue, secondValue, timeout = 90000) {
    this.client.browserA
      .waitAndSelectByValue(selector, firstValue, timeout);
    this.client.browserB
      .waitAndSelectByValue(selector, secondValue, timeout);
    return this.client.sync();
  }

  changeLanguage(selector, language = "english", timeout = 90000) {
    if (language === "french") {
      return this.client
        .waitForExist(selector.language_selector, timeout)
        .click(selector.language_selector)
        .waitForVisible(selector.language_FR, timeout)
        .click(selector.language_FR);

    } else {
      return this.client
        .waitForExist(selector.language_selector, timeout)
        .click(selector.language_selector)
        .waitForVisible(selector.language_EN, timeout)
        .click(selector.language_EN);
    }
  }

  waitForExistAndClick(selector, pause = 0, timeout = 90000) {
    this.client.browserA
      .waitForExist(selector, timeout)
      .click(selector);
    return this.client.browserB
      .pause(pause)
      .waitForExist(selector, timeout)
      .click(selector);
  }

  isVisible(selector) {
    return this.client
      .isVisible(selector)
      .then((isVisible) => {
        global.isVisible = isVisible;
      });
  }

  searchByEmail(customer, first_customer_email, second_customer_email, timeout = 90000) {
    if (global.isVisible.browserA && global.isVisible.browserB) {
      this.client.browserA
        .waitForExist(customer.customer_filter_by_email_input, timeout)
        .setValue(customer.customer_filter_by_email_input, first_customer_email)
        .keys('\uE007')
        .getText(customer.email_address_value.replace('%ID', 6)).then(function (text) {
          expect(text.browserA).to.be.equal(first_customer_email);
        });
      this.client.browserB
        .waitForExist(customer.customer_filter_by_email_input, timeout)
        .setValue(customer.customer_filter_by_email_input, second_customer_email)
        .keys('\uE007')
        .getText(customer.email_address_value.replace('%ID', 6)).then(function (text) {
          expect(text.browserB).to.be.equal(second_customer_email);
        });
      return this.client.sync();
    } else {
      this.client.browserA
        .getText(customer.email_address_value.replace('%ID', 5)).then(function (text) {
          console.log(text);
          expect(text).to.be.equal(first_customer_email);
        });
      this.client.browserB
        .getText(customer.email_address_value.replace('%ID', 5)).then(function (text) {
          console.log(text);
          expect(text).to.be.equal(second_customer_email);
        });
      return this.client.sync();
    }
  }

  searchByAddress(addresses, first_customer_address, second_customer_address, timeout = 90000) {
    if (global.isVisible.browserA && global.isVisible.browserB) {
      this.client.browserA
        .waitForExist(addresses.filter_by_address_input, timeout)
        .setValue(addresses.filter_by_address_input, first_customer_address)
        .keys('\uE007')
        .getText(addresses.address_value.replace('%ID', 5)).then(function (text) {
          expect(text.browserA).to.be.equal(first_customer_address);
        });
      this.client.browserB
        .waitForExist(addresses.filter_by_address_input, timeout)
        .setValue(addresses.filter_by_address_input, second_customer_address)
        .keys('\uE007')
        .getText(addresses.address_value.replace('%ID', 5)).then(function (text) {
          expect(text.browserB).to.be.equal(second_customer_address);
        });
      return this.client.sync();
    } else {
      this.client.browserA
        .getText(addresses.address_value.replace('%ID', 4)).then(function (text) {
          expect(text.browserA).to.be.equal(first_customer_address);
        });
      this.client.browserB
        .getText(addresses.address_value.replace('%ID', 4)).then(function (text) {
          expect(text.browserB).to.be.equal(second_customer_address);
        });
      return this.client.sync();
    }
  }

  waitForVisibleAndClick(selector, timeout = 90000) {
    return this.client
      .waitForVisible(selector, timeout)
      .click(selector);
  }

  scrollTo(selector, margin) {
    this.client.browserA
      .scrollTo(selector, margin);
    this.client.browserB
      .scrollTo(selector, margin);
    return this.client.sync();
  }

  checkTextValue(selector, textToCheckWith, parameter = 'equal', pause = 0) {
    switch (parameter) {
      case "contain":
        return this.client
          .pause(pause)
          .waitForExist(selector, 9000)
          .getText(selector).then(function(text) {
            expect(text.browserA).to.contain(textToCheckWith);
            expect(text.browserB).to.contain(textToCheckWith);
          });
        break;
      case "equal":
        return this.client
          .pause(pause)
          .waitForExist(selector, 9000)
          .getText(selector).then(function(text) {
            expect(text.browserA).to.equal(textToCheckWith);
            expect(text.browserB).to.equal(textToCheckWith);
          });
        break;
    }
  }

  checkConfirmation(selector, textToCheckWith, parameter = 'equal', pause = 0) {
    return this.client.browserA
      .pause(pause)
      .waitForExist(selector, 9000)
      .getText(selector).then(function(text) {
        expect(text).to.contain(textToCheckWith);
      });
  }

  waitForVisibleElement(selector) {
    return this.client.browserB
      .waitForVisibleElement(selector);
  }

  searchByValue(search_input, search_button, value, timeout = 90000) {
    return this.client
      .waitForExist(search_input, timeout)
      .setValue(search_input, value)
      .waitForExist(search_button, timeout)
      .click(search_button)
  }

  uploadPicture(picture1, picture2, selector, className = "dz-hidden-input") {
    this.client.browserA
      .execute(function (className) {
        document.getElementsByClassName(className).style = '';
      })
      .chooseFile(selector, path.join(__dirname, '..', 'datas', picture1));
    this.client.browserB
      .execute(function (className) {
        document.getElementsByClassName(className).style = '';
      })
      .chooseFile(selector, path.join(__dirname, '..', 'datas', picture2));
    return this.client.sync();
  }

  setPrice(selector, price1, price2) {
    this.client.browserA
      .scrollTo(selector, 50)
      .waitAndSetValue(selector, price1);
    this.client.browserB
      .scrollTo(selector, 50)
      .waitAndSetValue(selector, price2);
    return this.client.sync();
  }
}

module.exports = MultiremoteClient;