const {Taxes} = require('../../selectors/BO/international/taxes');
const {InternationalPage} = require('../../selectors/BO/international/index');
const {Menu} = require('../../selectors/BO/menu.js');
let promise = Promise.resolve();

module.exports = {
  createTax: function (taxData)  {
    scenario('Create a new "Tax"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should click on "Add new tax" button', () => client.waitForExistAndClick(Taxes.Taxes.add_new_tax_button));
      test('should set the "Name" input', () => client.waitAndSetValue(Taxes.Taxes.name_input, taxData.name + date_time));
      test('should set the "Rate" input', () => client.waitAndSetValue(Taxes.Taxes.rate_input, taxData.rate));
      test('should enable the tax', () => client.waitForExistAndClick(Taxes.Taxes.enable_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Taxes.Taxes.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, '×\nSuccessful creation.'));
    }, 'common_client');
  },
  editTax: function (taxData)  {
    scenario('Edit the created "Tax"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should search for the created tax', () => client.searchByValue(Taxes.Taxes.filter_name_input, Taxes.Taxes.filter_search_button, taxData.name + date_time));
      test('should click on "Edit" button', () => {
        return promise
          .then(() => client.waitForExistAndClick(Taxes.Taxes.edit_button))
          .then(() => client.editObjectData(taxData))
      });
      test('should set the "Name" input', () => client.waitAndSetValue(Taxes.Taxes.name_input, taxData.name + date_time));
      test('should set the "Rate" input', () => client.waitAndSetValue(Taxes.Taxes.rate_input, taxData.rate));
      test('should enable the tax', () => client.waitForExistAndClick(Taxes.Taxes.enable_button));
      test('should click on "Save" button', () => client.waitForExistAndClick(Taxes.Taxes.save_button));
      test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, '×\nSuccessful update.'));
    }, 'common_client');
  },
  checkTax: function (taxData)  {
    scenario('Check the "Tax"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should search for the created tax', () => client.searchByValue(Taxes.Taxes.filter_name_input, Taxes.Taxes.filter_search_button, taxData.name + date_time));
      test('should click on "Edit" button', () => client.waitForExistAndClick(Taxes.Taxes.edit_button));
      test('should check the tax\'s "Name"', () => client.checkAttributeValue(Taxes.Taxes.name_input, 'value', taxData.name + date_time));
      test('should check the tax\'s "Rate"', () => client.checkAttributeValue(Taxes.Taxes.rate_input, 'value', taxData.rate.toFixed(3).toString()));
    }, 'common_client');
  },
  deleteTax: function (taxData)  {
    scenario('Delete the "Tax"', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should search for the created tax', () => client.searchByValue(Taxes.Taxes.filter_name_input, Taxes.Taxes.filter_search_button, taxData.name + date_time));
      test('should click on "Dropdown > Delete" button', () => {
        return promise
          .then(() => client.waitForExistAndClick(Taxes.Taxes.dropdown_button))
          .then(() => client.waitForExistAndClick(Taxes.Taxes.delete_button))
          .then(() => client.alertAccept())
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, '×\nSuccessful deletion.'));
    }, 'common_client');
  },
  deleteTaxWithBulkAction: function (name) {
    scenario('Delete the "Tax" with bulk action', client => {
      test('should go to "Taxes" page', () => client.goToSubtabMenuPage(Menu.Improve.International.international_menu, Menu.Improve.International.taxes_submenu));
      test('should search for the created tax', () => client.searchByValue(Taxes.Taxes.filter_name_input, Taxes.Taxes.filter_search_button, name + date_time));
      test('should click on "Bulk action" button', () => client.waitForExistAndClick(Taxes.Taxes.bulk_action_button));
      test('should click on "Select all" action', () => client.waitForExistAndClick(Taxes.Taxes.action_group_button.replace('%ID', 1)));
      test('should click on "Bulk action" button', () => client.waitForExistAndClick(Taxes.Taxes.bulk_action_button));
      test('should click on "Delete" action', () => {
        return promise
          .then(() => client.waitForExistAndClick(Taxes.Taxes.action_group_button.replace('%ID', 5)))
          .then(() => client.alertAccept())
      });
      test('should verify the appearance of the green validation', () => client.checkTextValue(InternationalPage.success_panel, '×\nThe selection has been successfully deleted.'));
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