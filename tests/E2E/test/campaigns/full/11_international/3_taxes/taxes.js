const {Taxes} = require('../../../../selectors/BO/international/taxes');
const {InternationalPage} = require('../../../../selectors/BO/international/index');
const {Menu} = require('../../../../selectors/BO/menu.js');
let promise = Promise.resolve();

module.exports = {
  createTax: function (name, rate)  {
    scenario('Create a new "Tax"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should click on "Add new tax" button', () => client.waitForExistAndClick(Taxes.taxes.add_new_tax_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Taxes.taxes.name_input, name));
      test('should set the "Rate" input', () => client.waitAndSetValue(Taxes.taxes.rate_input, rate));
      test('should set the "Enable" of tax to "Yes"', () => client.waitForExistAndClick(Taxes.taxes.enable_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Taxes.taxes.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  editTax: function (name, updatedName, updatedRate)  {
    scenario('Edit the created "Tax"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should search for the created tax rule', () => client.searchByValue(Taxes.taxes.filter_name_input, Taxes.taxes.filter_search_button, name));
      test('should click on "Edit" button', () => client.waitForExistAndClick(Taxes.taxes.edit_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Taxes.taxes.name_input, updatedName));
      test('should set the "Rate" input', () => client.waitAndSetValue(Taxes.taxes.rate_input, updatedRate));
      test('should set the "Enable" of tax to "Yes"', () => client.waitForExistAndClick(Taxes.taxes.enable_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Taxes.taxes.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, '×\nSuccessful update.'));
    }, 'common_client');
  },
  checkTax: function (name, rate)  {
    scenario('Check the "Tax"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should search for the created tax', () => client.searchByValue(Taxes.taxes.filter_name_input, Taxes.taxes.filter_search_button, name));
      test('should click on "Edit" button', () => client.waitForExistAndClick(Taxes.taxes.edit_button));
      test('should check that the "Name" value is equal to "' + name + '"', () => client.checkAttributeValue(Taxes.taxes.name_input, 'value', name));
      test('should check that the "Rate" value is equal to "' + rate.toFixed(3).toString() + '"', () => client.checkAttributeValue(Taxes.taxes.rate_input, 'value', rate.toFixed(3).toString()));
    }, 'common_client');
  },
  deleteTax: function (name)  {
    scenario('Delete the "Tax"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should search for the created tax', () => client.searchByValue(Taxes.taxes.filter_name_input, Taxes.taxes.filter_search_button, name));
      test('should delete the tax', () => {
        return promise
          .then(() => client.waitForExistAndClick(Taxes.taxes.dropdown_button))
          .then(() => client.waitForExistAndClick(Taxes.taxes.delete_button))
          .then(() => client.alertAccept())
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, '×\nSuccessful deletion.'));
    }, 'common_client');
  },
  createTaxRule: function (name, value) {
    scenario('Create a new "Tax rule"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should click on "Tax Rules" tab', () => client.waitForExistAndClick(Menu.Improve.International.taxe_rules_tab));
      test('should click on "Add new tax rules group" button', () => client.waitForExistAndClick(Taxes.taxRules.add_new_tax_rules_group_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Taxes.taxRules.name_input, name));
      test('should set the "Enable" of tax rule to "Yes"', () => client.waitForExistAndClick(Taxes.taxRules.enable_button));
      test('should click on "Save and stay" button', () => client.waitForExistAndClick(Taxes.taxRules.save_and_stay_button));
      test('should select a "Tax rule"', () => client.waitAndSelectByValue(Taxes.taxRules.tax_select, value));
      test('should click on "Save and stay" button', () => client.waitForExistAndClick(Taxes.taxRules.save_button));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Taxes.taxRules.success_alert));
    }, 'common_client');
  },
  editTaxRule: function (name, updatedName) {
    scenario('Edit the "Tax rule"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should click on "Tax Rules" tab', () => client.waitForExistAndClick(Menu.Improve.International.taxe_rules_tab));
      test('should search for the created tax rule', () => client.searchByValue(Taxes.taxRules.filter_name_input, Taxes.taxRules.filter_search_button, name));
      test('should click on "Edit" button', () => client.waitForExistAndClick(Taxes.taxRules.edit_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Taxes.taxRules.name_input, updatedName));
      test('should click on "Save and stay" button', () => client.waitForExistAndClick(Taxes.taxRules.save_and_stay_button));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Taxes.taxRules.success_alert));
    }, 'common_client');
  },
  checkTaxRule: function (name) {
    scenario('Check the "Tax rule"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should click on "Tax Rules" tab', () => client.waitForExistAndClick(Menu.Improve.International.taxe_rules_tab));
      test('should search for the created tax rule', () => client.searchByValue(Taxes.taxRules.filter_name_input, Taxes.taxRules.filter_search_button, name));
      test('should click on "Edit" button', () => client.waitForExistAndClick(Taxes.taxRules.edit_button));
      test('should check that the "Name" is equal to "' + name + '"', () => client.checkAttributeValue(Taxes.taxRules.name_input, 'value', name));
      test('should click on "Save and stay" button', () => client.waitForExistAndClick(Taxes.taxRules.save_and_stay_button));
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Taxes.taxRules.success_alert));
    }, 'common_client');
  },
  deleteTaxRule: function (name) {
    scenario('Delete the "Tax rule"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should click on "Tax Rules" tab', () => client.waitForExistAndClick(Menu.Improve.International.taxe_rules_tab));
      test('should search for the created tax rule', () => client.searchByValue(Taxes.taxRules.filter_name_input, Taxes.taxRules.filter_search_button, name));
      test('should delete the tax rules', () => {
        return promise
          .then(() => client.waitForExistAndClick(Taxes.taxRules.dropdown_button))
          .then(() => client.waitForExistAndClick(Taxes.taxRules.delete_button))
          .then(() => client.alertAccept())
      });
      test('should check that the success alert message is well displayed', () => client.waitForExistAndClick(Taxes.taxRules.success_alert));
    }, 'common_client');
  }
};