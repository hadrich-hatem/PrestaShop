const {Menu} = require('../../selectors/BO/menu.js');
const {DiscountSubMenu} = require('../../selectors/BO/catalogpage/discount_submenu');
const {CatalogPage} = require('../../selectors/BO/catalogpage/index');
let promise = Promise.resolve();

module.exports = {
  createCatalogPriceRule(catalogPriceRuleData) {
    scenario('Create catalog price rules', client => {
      test('should go to "Discounts" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu , Menu.Sell.Catalog.discounts_submenu));
      test('should click on "Catalog Price Rules" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_price_rules_tab));
      test('should click on "Add new catalog price rule"', () => client.waitForExistAndClick(DiscountSubMenu.CatalogPriceRules.new_catalog_price_rules_button));
      test('should set the "Name" input', () => client.waitAndSetValue(DiscountSubMenu.CatalogPriceRules.name_input, catalogPriceRuleData.name + date_time));
      test('should set the "From quantity" input', () => client.waitAndSetValue(DiscountSubMenu.CatalogPriceRules.form_quantity, catalogPriceRuleData.quantity));
      test('should set the "Reduction type" input', () => client.waitAndSelectByValue(DiscountSubMenu.CatalogPriceRules.reduction_type_select, catalogPriceRuleData.type));
      test('should set the "Reduction" input', () => client.waitAndSetValue(DiscountSubMenu.CatalogPriceRules.reduction_input, catalogPriceRuleData.reduction));
      test('should click on "save" button', () => client.waitForExistAndClick(DiscountSubMenu.CatalogPriceRules.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  editCatalogPriceRule(catalogPriceRuleData, type) {
    scenario('Edit the created catalog price rules', client => {
      test('should go to "Discounts" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu , Menu.Sell.Catalog.discounts_submenu));
      test('should click on "Catalog Price Rules" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_price_rules_tab));
      test('should click on "Edit" button', () => {
        return promise
          .then(() => client.isVisible(DiscountSubMenu.CatalogPriceRules.search_name_input))
          .then(() => client.searchByName(DiscountSubMenu.CatalogPriceRules.search_name_input, DiscountSubMenu.CatalogPriceRules.search_button, catalogPriceRuleData.name + date_time))
          .then(() => client.waitForExistAndClick(DiscountSubMenu.CatalogPriceRules.edit_button))
          .then(() => client.editObjectData(catalogPriceRuleData, type))
      });
      test('should set the "Name" input', () => client.waitAndSetValue(DiscountSubMenu.CatalogPriceRules.name_input, catalogPriceRuleData.name + date_time));
      test('should set the "From quantity" input', () => client.waitAndSetValue(DiscountSubMenu.CatalogPriceRules.form_quantity, catalogPriceRuleData.quantity));
      test('should set the "Reduction type" input', () => client.waitAndSelectByValue(DiscountSubMenu.CatalogPriceRules.reduction_type_select, catalogPriceRuleData.type));
      test('should set the "Reduction" input', () => client.waitAndSetValue(DiscountSubMenu.CatalogPriceRules.reduction_input, catalogPriceRuleData.reduction));
      test('should click on "save" button', () => client.waitForExistAndClick(DiscountSubMenu.CatalogPriceRules.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful update.'));
    }, 'discount');
  },
  checkCatalogPriceRule(catalogPriceRuleData) {
    scenario('Check the catalog price rules', client => {
      test('should go to "Discounts" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu , Menu.Sell.Catalog.discounts_submenu));
      test('should click on "Catalog Price Rules" tab', () => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_price_rules_tab));
      test('should click on "Edit" button', () => {
        return promise
          .then(() => client.isVisible(DiscountSubMenu.CatalogPriceRules.search_name_input))
          .then(() => client.searchByName(DiscountSubMenu.CatalogPriceRules.search_name_input, DiscountSubMenu.CatalogPriceRules.search_button, catalogPriceRuleData.name + date_time))
          .then(() => client.waitForExistAndClick(DiscountSubMenu.CatalogPriceRules.edit_button))
      });
      test('should check the catalog price rule\'s "Name"', () => client.checkAttributeValue(DiscountSubMenu.CatalogPriceRules.name_input, 'value', catalogPriceRuleData.name + date_time));
      test('should check the catalog price rule\'s "From quantity"', () => client.checkAttributeValue(DiscountSubMenu.CatalogPriceRules.form_quantity, 'value', catalogPriceRuleData.quantity.toString()));
      test('should check the catalog price rule\'s "Reduction type"', () => client.isSelected(DiscountSubMenu.CatalogPriceRules.reduction_type_select + '//option[@value="' + catalogPriceRuleData.type +'"]'));
      test('should check the catalog price rule\'s "Reduction"', () => client.checkAttributeValue(DiscountSubMenu.CatalogPriceRules.reduction_input, 'value', catalogPriceRuleData.reduction.toFixed(6).toString()));
    }, 'discount');
  },
  deleteCatalogPriceRule(catalogPriceRuleData){
    scenario('Delete catalog price rules', client => {
      test('should go to "Discounts" page', () => client.goToSubtabMenuPage(Menu.Sell.Catalog.catalog_menu , Menu.Sell.Catalog.discounts_submenu));
      test('should click on "Catalog Price Rules" tab', () => {
        return promise
          .then(() => client.waitForExistAndClick(Menu.Sell.Catalog.catalog_price_rules_tab))
          .then(() => client.isVisible(DiscountSubMenu.CatalogPriceRules.search_name_input))
          .then(() => client.searchByName(DiscountSubMenu.CatalogPriceRules.search_name_input, DiscountSubMenu.CatalogPriceRules.search_button, catalogPriceRuleData.name + date_time))
      });
      test('should click on "dropdown toggle" button', () => client.waitForExistAndClick(DiscountSubMenu.CatalogPriceRules.dropdown_button));
      test('should click on "Delete" button', () => client.waitForExistAndClick(DiscountSubMenu.CatalogPriceRules.delete_button));
      test('should accept the confirmation alert', () => client.alertAccept());
      test('should verify the appearance of the green validation', () => client.checkTextValue(CatalogPage.success_panel, '×\nSuccessful deletion.'));
    }, 'discount');
  }
};