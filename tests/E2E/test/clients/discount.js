var CommonClient = require('./common_client');
const {DiscountSubMenu} = require('../selectors/BO/catalogpage/discount_submenu');

class Discount extends CommonClient {

  searchByName(inputSelector, buttonSelector, name) {
    if (isVisible) {
      return this.client
        .waitAndSetValue(inputSelector, name)
        .waitForExistAndClick(buttonSelector)
    } else {
      return this.client.pause(1000)
    }
  }
}

module.exports = Discount;