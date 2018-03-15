var CommonClient = require('./common_client');

class Discount extends CommonClient {

  searchByName(inputSelector, buttonSelector, name) {
    if (isVisible) {
      return this.client
        .waitAndSetValue(inputSelector, name)
        .waitForExistAndClick(buttonSelector)
    }
  }
}

module.exports = Discount;