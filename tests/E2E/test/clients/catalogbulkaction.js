var CommonClient = require('./common_client');


class Catalog extends CommonClient {

  selectAllProducts(selector) {
    return this.client
      .refresh()
      .waitForExistAndClick(selector)
  }

  selectAction(CatalogPage, action) {
    return this.client
      .waitForExistAndClick(CatalogPage.action_group_button)
      .waitForExistAndClick(CatalogPage.action_button.replace('%ID', action))
      .waitForVisible(CatalogPage.green_validation, 90000);
  }
}

module.exports = Catalog;
